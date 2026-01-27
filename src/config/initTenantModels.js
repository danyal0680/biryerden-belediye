import { socialService } from '../modules/social_services/social.models.js';
import defineProjectModels from '../modules/highway_construction/highway.models.js';
import { getTenantUserModel } from '../modules/tenant/tenant.models.js';
import defineIllegalModels from '../modules/illegal_construction/illegal.models.js';
import defineAidApplicationModels from '../modules/applications/applications.models.js';
import defineRegisteredInventoryModels from '../modules/registered_inventory/inventory.models.js';

const initTenantModels = (sequelize) => {
    socialService(sequelize);
    defineProjectModels(sequelize);
    getTenantUserModel(sequelize);
    defineIllegalModels(sequelize);
    defineAidApplicationModels(sequelize);
    defineRegisteredInventoryModels(sequelize);
};

export default initTenantModels;