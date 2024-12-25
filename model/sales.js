const mongoose = require("mongoose");

const sales_Schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  productDetails: {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = sales = mongoose.model("sales", sales_Schema);
