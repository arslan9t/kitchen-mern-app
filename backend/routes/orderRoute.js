import express from "express";
import {
	cancelPage,
	loadOrder,
	loadStatus,
	orderPage,
	placeOrder,
	successPage,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/pay", authMiddleware, placeOrder);
orderRouter.get("/complete-order/:id/:userId", successPage);
orderRouter.get("/cancel-order/:id/:userId", cancelPage);
orderRouter.post("/user-order", authMiddleware, orderPage);
orderRouter.get("/load", loadOrder);
orderRouter.post("/status", loadStatus);

export default orderRouter;
