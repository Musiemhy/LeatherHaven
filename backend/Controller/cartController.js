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

      const existingCart = await Cart.findOne({
        user,
        "items.product": item.product,
        "items.size": item.size,
      });

      if (existingCart) {
        await Cart.updateOne(
          { user, "items.product": item.product, "items.size": item.size },
          {
            $inc: {
              "items.$.quantity": item.quantity,
            },
          }
        );
      } else {
        await Cart.updateOne(
          { user },
          {
            $push: {
              items: item,
            },
          },
          { upsert: true }
        );
      }
    }

    return res.status(200).send({ message: "Cart updated successfully" });
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

export const updateCartById = async (req, res) => {
  try {
    const { cartId, size, quantity } = req.body;

    if (!cartId || !size || !quantity) {
      return res
        .status(400)
        .send({ message: "Cart ID, size, and quantity are required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { _id: cartId, "items.size": size },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteCartById = async (req, res) => {
  try {
    const { cartId } = req.query;

    if (!cartId) {
      console.log("can't get cartId");
      return res.status(400).send({ message: "Cart ID is required" });
    }

    const cart = await Cart.deleteOne({ _id: cartId });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
