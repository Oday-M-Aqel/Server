const mongoose = require("mongoose");
const { isAlpha, isStrongPassword, isNumeric, isEmail } = require("validator");
const bcrypt = require("bcrypt");

const users_Schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 2,
    validate: [isAlpha, "First name must contain only alphabet values"],
  },
  middle_name: {
    type: String,
    required: true,
    minlength: 2,
    validate: [isAlpha, "Middle name must contain only alphabet values"],
  },
  last_name: {
    type: String,
    required: true,
    minlength: 2,
    validate: [isAlpha, "Last name must contain only alphabet values"],
  },
  avatar: {
    type: Buffer,
    default: "../upload/avatar/defaultAvatar.jpg",
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // Validate: [isStrongPassword, "Please enter strong password"],
  },
  person_id: {
    type: String,
    minlength: 9,
    required: true,
    validate: [isNumeric, "Id must be only numbers"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    // unique: true,
    validate: [isNumeric, "Phone number must be only numbers"],
  },
  city: {
    type: String,
    required: true,
  },
  acceptTermsAndConditions: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updateDate: {
    type: Date,
  },
});

users_Schema.pre("save", async function (next) {
  const added = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, added);
  next();
});

module.exports = users = new mongoose.model("users", users_Schema);
