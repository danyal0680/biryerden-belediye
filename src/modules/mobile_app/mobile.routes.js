import express from 'express';
import { createMobileApp, listMobileApps } from './mobile.controller.js';
import { protect } from '../../middleware/super_admin_auth.middleware.js';
import { createUploader } from '../../config/uploadConfig.js';

const router = express.Router();
const upload = createUploader('mobile');

router.post('/add-mobile-app', protect, upload.single('app_image'), createMobileApp);
router.get('/', protect, listMobileApps);

export default router;
