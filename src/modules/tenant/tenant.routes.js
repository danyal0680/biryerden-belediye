import express from 'express';
import { loginTenantUser } from './tenant.controller.js';

const router = express.Router();

router.post('/login', loginTenantUser);

export default router;