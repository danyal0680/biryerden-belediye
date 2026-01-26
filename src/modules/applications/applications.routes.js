import express from "express";
import { resolveTenant } from "../../middleware/tenantResolver.js";
import { authenticate } from "../../middleware/admin_auth.middleware.js";
import { getAllAidApplicationsByAlias, getAllAidApplications } from "./applications.controller.js";

const router = express.Router();

router.get("/aid-applications/:alias", resolveTenant, authenticate, getAllAidApplicationsByAlias);
router.get("/distribution/list", resolveTenant, authenticate, getAllAidApplications);

export default router;