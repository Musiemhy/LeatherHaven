import mongoose from "mongoose";
import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const addCart = async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .send({ message: "Please send all required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }

    for (const item of items) {
      if (!item.product || !item.quantity) {
        return res.status(400).send({
          message: "Each item must have a product and quantity",
        });
      }

      const itemSize = item.size === "" ? null : item.size;

      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      const existingCart = await Cart.findOne({
        user,
        "items.product": item.product,
        "items.size": itemSize,
      });

      let newQuantity = item.quantity;
      if (existingCart) {
        const existingItem = existingCart.items.find(
          (i) => i.product.toString() === item.product && i.size === itemSize
        );
        newQuantity += existingItem.quantity;
      }

      if (newQuantity > product.stock) {
        newQuantity = product.stock;
        return res.status(400).send({
          message: `You have exceeded the available stock for this item. Please visit your cart to adjust the quantity.`,
        });
      }

      if (existingCart) {
        await Cart.updateOne(
          {
            user,
            "items.product": item.product,
            "items.size": itemSize,
          },
          { $set: { "items.$.quantity": newQuantity } }
        );
      } else {
        await Cart.updateOne(
          { user },
          {
            $push: {
              items: { ...item, size: itemSize, quantity: newQuantity },
            },
          },
          { upsert: true }
        );
      }
    }

    return res.status(200).send({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error: " + error.message });
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
    res.status(500).send({ message: "Server error: " + error.message });
  }
};

export const updateCartById = async (req, res) => {
  try {
    const { cartId, itemId, quantity, size } = req.body;

    if (!cartId || !itemId || quantity === undefined) {
      return res
        .status(400)
        .send({ message: "Cart ID, Item ID, and quantity are required" });
    }

    const updateFields = { "items.$.quantity": quantity };
    if (size !== undefined) {
      updateFields["items.$.size"] = size;
    }

    const cart = await Cart.findOneAndUpdate(
      { _id: cartId, "items._id": itemId },
      { $set: updateFields },
      { new: true }
    );

    if (!cart) {
      return res.status(404).send({ message: "Cart or item not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error: " + error.message });
  }
};

export const deleteCartById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const cart = await Cart.deleteOne({ _id: userId });

    if (!cart.deletedCount) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).send({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error: " + error.message });
  }
};

export const deleteCartItemById = async (req, res) => {
  try {
    const { cartId, itemId } = req.query;

    if (!cartId || !itemId) {
      return res
        .status(400)
        .send({ message: "Cart ID and Item ID are required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { _id: cartId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).send({ message: "Cart or item not found" });
    }

    return res.status(200).send({ message: "Item deleted successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error: " + error.message });
  }
};
