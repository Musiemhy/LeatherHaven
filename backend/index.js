import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import { Product } from "./models/productModel.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get(`/`, (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
});

//route to add proucts
app.post(`/addproducts`, async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.description ||
      !Array.isArray(request.body.images) ||
      request.body.images.length === 0 ||
      !request.body.category ||
      !request.body.price ||
      !request.body.stock ||
      !request.body.rating ||
      !request.body.numReviews
    ) {
      return response.status(400).send({
        message: "send all required fields",
      });
    }
    const newProduct = {
      name: request.body.name,
      description: request.body.description,
      images: request.body.images,
      category: request.body.category,
      price: request.body.price,
      stock: request.body.stock,
      rating: request.body.rating,
      numReviews: request.body.numReviews,
      reviews: request.body.reviews,
      discount: request.body.discount,
    };

    const product = await Product.create(newProduct);
    return response.status(201).send(product);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//route to get all proucts
app.get(`/getproducts`, async (request, response) => {
  try {
    const products = await Product.find({});
    return response.status(200).json(products);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
