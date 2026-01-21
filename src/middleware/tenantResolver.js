import Municipality from "../modules/municipality/municipality.models.js";
import { getTenantDb } from "../config/dynamicDb.js";

export const resolveTenant = async (req, res, next) => {
    try {
        const muniId = req.headers['x-municipality-id'] || req.body.municipalityId;

        if (!muniId) {
            return res.status(400).json({ message: "Belediyye ID-si alınmalı." });
        }

        const muni = await Municipality.findByPk(muniId);

        if (!muni || !muni.is_active) {
            return res.status(404).json({ message: "Belediye bulunamadı" });
        }

        const tenantDb = getTenantDb(muni.dbName, `${muni.dbName}`, muni.dbPassword);        
        req.tenantDb = tenantDb;
        req.muni = muni;
        
        next();
    } catch (error) {
        console.error("Tenant bağlantı Hatası:", error);
        res.status(500).json({ message: "Tenant bağlantısı kurulamadı." });
    }
};