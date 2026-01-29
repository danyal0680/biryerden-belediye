import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';
import { getAsphaltPavementList } from './asphalt.controller.js';
import { Router } from 'express';

const router = Router();

router.get("/list", resolveTenant, authenticate, getAsphaltPavementList);

export default router;
