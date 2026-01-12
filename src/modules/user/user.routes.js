import express from 'express';
import { login, createTenantUser } from './user.controller.js';
import { protect } from '../../middleware/super_admin_auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/add-tenant-user', protect, createTenantUser);

export default router;