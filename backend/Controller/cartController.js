import { Cart } from "../models/cartModel.js";

export const addCart = async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .send({ message: "Please send all required fields" });
    }

    for (const item of items) {
      if (!item.product || !item.quantity || !item.size) {
        return res.status(400).send({
          message: "Each item must have a product, size, and quantity",
        });
      }
    }

    const newCart = {
      user,
      items,
    };

    const cart = await Cart.create(newCart);

    return res.status(201).send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const cart = await Cart.find({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
