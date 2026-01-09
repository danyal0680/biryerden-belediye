import express from 'express';
import { login, createMunicipalityAdmin } from './user.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/add-tenant-admin', protect, createMunicipalityAdmin);

export default router;