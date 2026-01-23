import express from 'express';
import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';

import { 
    getAllIllegalConstructions, getAllDestroyedBuildings, getAllZoningAmnesties, getAllCancellationObjections, getAllPunishmentReports, getAllBuildingRegistrations,
    getAllDemolitions
} from './illegal.controller.js';

const router = express.Router();

router.get('/illegal-constructions-by-years', resolveTenant, authenticate, getAllIllegalConstructions);
router.get('/destroyed-buildings-by-years', resolveTenant, authenticate, getAllDestroyedBuildings);
router.get('/zoning-amnesties', resolveTenant, authenticate, getAllZoningAmnesties);
router.get('/cancellation-objections', resolveTenant, authenticate, getAllCancellationObjections);
router.get('/punishment-reports', resolveTenant, authenticate, getAllPunishmentReports);
router.get('/building-registrations', resolveTenant, authenticate, getAllBuildingRegistrations);
router.get('/demolitions', resolveTenant, authenticate, getAllDemolitions);

export default router;
