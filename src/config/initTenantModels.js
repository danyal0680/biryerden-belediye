import { socialService } from '../modules/social_services/social.models.js';
import defineProjectModels from '../modules/highway_construction/highway.models.js';
import { getTenantUserModel } from '../modules/tenant/tenant.models.js';

const initTenantModels = (sequelize) => {
    socialService(sequelize);
    defineProjectModels(sequelize);
    getTenantUserModel(sequelize);
};

export default initTenantModels;