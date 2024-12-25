const { isAlpha, isNumeric } = require("validator");

const mongoose = require("mongoose");

const product_Schema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    validate: [isAlpha, "Name must contain only alpha"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: [isNumeric, "Price must be only positive integer"],
  },
  description: {
    type: String,
    required: true,
  },
  mainImage: {
    type: Buffer,
    required: true,
  },
  multiImage: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    enum: ["sold", "available", "not available"],
    default: "available",
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

module.exports = product = mongoose.model("product", product_Schema);
