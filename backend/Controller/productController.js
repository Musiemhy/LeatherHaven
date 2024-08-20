import { Product } from "../models/productModel.js";

export const addProduct = async (request, response) => {
  try {
    const {
      name,
      description,
      images,
      category,
      price,
      stock,
      rating,
      numReviews,
      reviews,
      discount,
    } = request.body;

    if (
      !name ||
      !description ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !category ||
      !price ||
      !stock ||
      !rating ||
      !numReviews
    ) {
      return response
        .status(400)
        .send({ message: "Please send all required fields" });
    }

    const newProduct = {
      name,
      description,
      images,
      category,
      price,
      stock,
      rating,
      numReviews,
      reviews,
      discount,
    };
    const product = await Product.create(newProduct);

    return response.status(201).send(product);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getProductsByCategoryAndGender = async (req, res) => {
  try {
    const { category = "", gender = "ALL" } = req.query;

    const query = {};

    if (category && category !== "Allproduct") {
      query.category = category;
    }

    if (gender && gender !== "ALL") {
      query.gender = gender;
    }

    const products = await Product.find(query);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
