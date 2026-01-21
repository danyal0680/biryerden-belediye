import { socialService } from '../modules/social_services/social.models.js';
import defineProjectModels from '../modules/highway_construction/highway.models.js';

const initTenantModels = (sequelize) => {
    socialService(sequelize);
    defineProjectModels(sequelize);
};

export default initTenantModels;