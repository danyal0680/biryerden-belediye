import express from 'express';
import baseRoutes from './modules/base/base.routes.js';
import userRoutes from './modules/user/user.routes.js';
import municipalityRoutes from './modules/municipality/municipality.routes.js';
import socialRoutes from './modules/social_services/social.routes.js';
import tenantRoutes from './modules/tenant/tenant.routes.js';
import highwayRoutes from './modules/highway_construction/highway.routes.js';
import illegalRoutes from './modules/illegal_construction/illegal.routes.js';
import applicationsRoutes from './modules/applications/applications.routes.js';
import inventoryRoutes from './modules/registered_inventory/inventory.routes.js';
import heritageRoutes from './modules/cultural_heritage/heritage.routes.js';

const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/municipalities', municipalityRoutes);
apiRouter.use('/social-services', socialRoutes);
apiRouter.use('/tenant', tenantRoutes);
apiRouter.use('/highway-construction', highwayRoutes);
apiRouter.use('/illegal-construction', illegalRoutes);
apiRouter.use('/social-aid', applicationsRoutes);
apiRouter.use('/registered-inventory', inventoryRoutes);
apiRouter.use('/cultural-heritage', heritageRoutes);

export { baseRoutes, apiRouter };
