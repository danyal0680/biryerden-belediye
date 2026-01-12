import Municipality from "./modules/municipality/municipality.models.js";
import { getTenantDb } from './config/dynamicDb.js';
import { socialService } from './modules/social_services/social.models.js';

const syncAllTenants = async () => {
    try {
        const municipalities = await Municipality.findAll({ where: { is_active: true } });
        console.log(`🔄 ${municipalities.length} belediye için tenant veritabanları kontrol ediliyor...`);

        for (const muni of municipalities) {
            let tenantSequelize;
            try {
                tenantSequelize = getTenantDb(muni.dbName, `user_${muni.dbName}`, muni.dbPassword);
                
                socialService(tenantSequelize);
                await tenantSequelize.sync({ alter: true });
                console.log(`✅ ${muni.name} için tablolar senkronize edildi.`);
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