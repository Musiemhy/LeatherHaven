import { Order } from "../models/orderModel.js";

export const addOrder = async (req, res) => {
  try {
    const { User, items, totalPrice, shippingAddress, payment } = req.body;

    if (
      !User ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalPrice ||
      !shippingAddress ||
      !payment
    ) {
      return res
        .status(401)
        .send({ message: "Please fill all required fields!" });
    }

    for (const item of items) {
      if (!item.product || !item.quantity || !item.size) {
        return res.status(400).send({
          message: "Each item must have a product, size, and quantity",
        });
      }

      const newOrder = { User, items, totalPrice, shippingAddress, payment };
      const order = await Order.create(newOrder);

      if (!order) {
        return res.status(402).send({
          message: "Failed to create an order, Please Try again later.",
        });
      }

      return res.status(201).send(order);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const order = await Order.find({ user: userId });

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
