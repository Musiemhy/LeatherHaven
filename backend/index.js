import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoutes from "../backend/Routes/ProductRoutes.js";
import cartRoutes from "../backend/Routes/cartRoutes.js";
import userRoutes from "../backend/Routes/userRoutes.js";

const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", ProductRoutes);
app.use("/api", cartRoutes);
app.use("/api", userRoutes);

app.get(`/`, (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
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
