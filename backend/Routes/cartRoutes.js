import express from "express";
import {
  addCart,
  getCartById,
  updateCartById,
  deleteCartById,
} from "../Controller/cartController.js";

const router = express.Router();

router.post("/addcart", addCart);
router.get("/getcart", getCartById);
router.post("/updatecart", updateCartById);
router.delete("/deletecart", deleteCartById);

export default router;
