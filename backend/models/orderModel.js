import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  payment: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    amount: { type: Number, rquired: true },
    transactionId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sucess", "fail"],
      default: "Pending",
    },
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "Processing",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
