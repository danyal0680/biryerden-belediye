import express from 'express';
import { getSocialServices, getCancelledServices } from './social.controller.js';
import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';

const router = express.Router();

router.get('/social-services', resolveTenant, authenticate, getSocialServices);
router.get('/social-services/cancelled', resolveTenant, authenticate, getCancelledServices);

export default router;