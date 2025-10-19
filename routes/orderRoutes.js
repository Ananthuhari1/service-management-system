import express from "express";
import { createOrder, getClientOrders, getProviderOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Client routes
router.post("/", protect, authorizeRoles("client"), createOrder);
router.get("/my-orders", protect, authorizeRoles("client"), getClientOrders);

// Provider routes
router.get("/incoming", protect, authorizeRoles("provider"), getProviderOrders);
router.patch("/:id/status", protect, authorizeRoles("provider"), updateOrderStatus);

export default router;
