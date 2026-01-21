import express from 'express';
import { resolveTenant } from '../../middleware/tenantResolver.js';
import { authenticate } from '../../middleware/admin_auth.middleware.js';
import createUploader from '../../config/uploadConfig.js';

const upload = createUploader('highway_projects');
import {
    getAllProjects,
    getProject,
    getTeamsList,
    getManagersList,
    getPeopleList,
    getProjectMetadata,
    uploadProjectPhoto,
    createProject,
    updateProject,
    patchProject,
    deleteProject,
    deleteProjectPhoto
} from './highway.controller.js';

const router = express.Router();

router.get('/projects', resolveTenant, authenticate, getAllProjects);
router.get('/project/:id', resolveTenant, authenticate, getProject);
router.post('/project', resolveTenant, authenticate, upload.array('photos', 20), createProject);
router.put('/project/:id', resolveTenant, authenticate, upload.array('photos', 20), updateProject);
router.patch('/project/:id', resolveTenant, authenticate, patchProject);
router.delete('/project/:id', resolveTenant, authenticate, deleteProject);
router.get('/options/teams', resolveTenant, authenticate, getTeamsList);
router.get('/options/managers', resolveTenant, authenticate, getManagersList);
router.get('/options/people', resolveTenant, authenticate, getPeopleList);
router.get('/options/metadata', resolveTenant, authenticate, getProjectMetadata);
router.post('/project/:projectId/photo', resolveTenant, authenticate, uploadProjectPhoto);
router.delete('/project/:projectId/photo/:photoId', resolveTenant, authenticate, deleteProjectPhoto);

export default router;