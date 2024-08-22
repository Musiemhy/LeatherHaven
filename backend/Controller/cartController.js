import { Cart } from "../models/cartModel.js";

export const addCart = async (request, response) => {
  try {
    const { user, items } = request.body;

    if (!user || !Array.isArray(items) || items.length === 0) {
      return response
        .status(400)
        .send({ message: "Please send all required fields" });
    }

    for (const item of items) {
      if (!item.product || !item.quantity || !item.size) {
        return response.status(400).send({
          message: "Each item must have a product, size and quantity",
        });
      }
    }

    const newCart = {
      user,
      items,
    };

    const cart = await Cart.create(newCart);

    return response.status(201).send(cart);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
