import express from 'express';
import { loginTenantUser, tenantUserProfile } from './tenant.controller.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';

const router = express.Router();

router.post('/login', loginTenantUser);
router.get('/user-profile', authenticate, tenantUserProfile);

export default router;