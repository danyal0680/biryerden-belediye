import express from 'express';
import { createMunicipality } from './municipality.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createMunicipality);

export default router;