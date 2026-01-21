import Municipality from "../modules/municipality/municipality.models.js";
import { getTenantDb } from '../config/dynamicDb.js';
import initTenantModels from '../config/initTenantModels.js';

const syncAllTenants = async () => {
    try {
        const municipalities = await Municipality.findAll({ where: { is_active: true } });
        console.log(`🔄 ${municipalities.length} belediye için tenant veritabanları kontrol ediliyor...`);

        for (const muni of municipalities) {
            let tenantSequelize;
            try {
                tenantSequelize = getTenantDb(muni.dbName, muni.dbUser, muni.dbPassword);
                initTenantModels(tenantSequelize);
                await tenantSequelize.sync({ alter: true });
            } catch (err) {
                console.error(`❌ ${muni.name} veritabanına bağlanırken hata oluştu:`, err.message);
            } finally {
                if (tenantSequelize) await tenantSequelize.close();
            }
        }
    } catch (error) {
        console.error('❌ Tenant senkronizasyon hatası:', error);
    }
};

export default syncAllTenants;