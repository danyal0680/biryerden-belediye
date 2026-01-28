import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';
import { getCulturalHeritageList } from './heritage.controller.js';
import { Router } from 'express';

const router = Router();

router.get("/list", resolveTenant, authenticate, getCulturalHeritageList);

export default router;
