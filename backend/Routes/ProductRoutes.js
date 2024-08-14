import express from "express";
import {
  addProduct,
  getProductsByCategoryAndGender,
} from "../Controller/productController.js";

const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getproducts", getProductsByCategoryAndGender);

export default router;
