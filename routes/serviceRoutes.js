import express from "express";
import { createService, getAllServices, getProviderServices } from "../controllers/serviceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllServices); // public
router.post("/", protect, authorizeRoles("provider"), createService);
router.get("/my-services", protect, authorizeRoles("provider"), getProviderServices);
export default router;
