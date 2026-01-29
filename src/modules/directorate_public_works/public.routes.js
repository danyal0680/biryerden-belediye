import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';
import { getDirectoratePublicWorksList } from './public.controller.js';
import { Router } from 'express';

const router = Router();

router.get("/list", resolveTenant, authenticate, getDirectoratePublicWorksList);

export default router;
