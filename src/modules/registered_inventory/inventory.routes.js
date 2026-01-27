import express from "express";
import { getRegisteredInventoryList } from "./inventory.controller.js";
import { resolveTenant } from "../../middleware/tenantResolver.js";
import { authenticate } from "../../middleware/admin_auth.middleware.js";

const router = express.Router();

router.get("/list", resolveTenant, authenticate, getRegisteredInventoryList);

export default router;