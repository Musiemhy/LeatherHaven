import express from "express";
import {
  addProduct,
  getProductsByCategoryAndGender,
  getProductsById,
} from "../Controller/productController.js";

const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getproducts", getProductsByCategoryAndGender);
router.get("/getproductsId", getProductsById);

export default router;
