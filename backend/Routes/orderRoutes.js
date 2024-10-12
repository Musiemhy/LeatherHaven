import express from "express";
import { addOrder, getOrder } from "../Controller/orderController.js";

const router = express.Router();

router.post("/addorder", addOrder);
router.post("/getorder", getOrder);

export default router;
