import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Municipality from '../municipality/municipality.models.js';
import { getTenantDb } from '../../config/dynamicDb.js';
import { getTenantUserModel } from '../tenant/tenant.models.js'; 


const loginTenantUser = async (req, res) => {
    let tenantSequelize;
    try {
        const { tcNumber, password, municipalityId } = req.body;
        const muni = await Municipality.findByPk(municipalityId);
        // const host = req.headers.host;
        // const subdomain = host.split('.')[0];
        // const muni = await Municipality.findOne({ where: { subdomain: subdomain, is_active: true } });
        if (!muni) return res.status(404).json({ message: "Belediye bulunamadı." });
        tenantSequelize = getTenantDb(muni.dbName, muni.dbUser, muni.dbPassword);
        await tenantSequelize.authenticate();
        const TenantUser = getTenantUserModel(tenantSequelize);

        const user = await TenantUser.findOne({ 
            where: { tcNumber: tcNumber.trim() } 
        });

        if (!user) {
            console.log(`Hata: ${tcNumber} bulunamadı!`);
            await tenantSequelize.close();
            return res.status(401).json({ message: "Böyle bir kullanıcı bulunamadı!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            await tenantSequelize.close();
            return res.status(401).json({ message: "Şifre yanlış!" });
        }

        const token = jwt.sign(
            { id: user.id, tcNumber: user.tcNumber, dbName: muni.dbName },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        await tenantSequelize.close();
        return res.status(200).json({ status: 'success', token });

    } catch (error) {
        if (tenantSequelize) await tenantSequelize.close();
        console.error("Hata:", error);
        res.status(500).json({ message: error.message });
    }
};


const tenantUserProfile = async (req, res) => {
    let tenantSequelize;

    try {
        const { id, dbName } = req.user;
        const muni = await Municipality.findOne({ where: { dbName } });

        if (!muni) {
            return res.status(404).json({ message: 'Belediye bulunamadı' });
        }

        tenantSequelize = getTenantDb(muni.dbName, muni.dbUser, muni.dbPassword);

        await tenantSequelize.authenticate();
        const TenantUser = getTenantUserModel(tenantSequelize);
        const user = await TenantUser.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        await tenantSequelize.close();
        return res.status(200).json({
            status: 'success',
            data: user
        });

    } catch (error) {
        if (tenantSequelize) await tenantSequelize.close();
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export { loginTenantUser, tenantUserProfile };