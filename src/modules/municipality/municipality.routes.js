import express from 'express';
import { createMunicipality } from './municipality.controller.js';
import { protect } from '../../middleware/super_admin_auth.middleware.js';

const router = express.Router();

router.post('/add-municipality', protect, createMunicipality);

export default router;