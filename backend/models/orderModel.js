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
        required: function () {
          return this.product.category === "Jacket";
        },
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
    },
    phone: {
      type: Number,
      required: true,
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
    },
    phone: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "success", "fail"],
      default: "pending",
    },
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
