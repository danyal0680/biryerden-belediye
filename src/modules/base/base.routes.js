import express from 'express';
import { base } from './base.controller.js';

const router = express.Router();

router.get('/', base);

export default router;