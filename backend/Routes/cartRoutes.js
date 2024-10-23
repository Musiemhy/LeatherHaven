import express from "express";
import {
  addCart,
  getCartById,
  updateCartById,
  deleteCartById,
  deleteCartItemById,
} from "../Controller/cartController.js";

const router = express.Router();

router.post("/addcart", addCart);
router.get("/getcart", getCartById);
router.post("/updatecart", updateCartById);
router.delete("/deletecart", deleteCartItemById);
router.delete("/clearcart", deleteCartById);
export default router;
