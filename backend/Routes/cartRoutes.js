import express from "express";
import { addCart, getCartById } from "../Controller/cartController.js";

const router = express.Router();

router.post("/addcart", addCart);
router.get("/getcart", getCartById);

export default router;
