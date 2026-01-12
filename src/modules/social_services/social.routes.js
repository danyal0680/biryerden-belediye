import express from 'express';
import { getSocialServices } from './social.controller.js';
import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';

const router = express.Router();

router.get('/social-services', resolveTenant, authenticate, getSocialServices);

export default router;