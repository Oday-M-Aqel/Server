const dotenv = require("dotenv");
dotenv.config();
const User = require("../model/users");
const Product = require("../model/product");
const bcrypt = require("bcrypt");

module.exports.updateUser = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      middleName,
      lastName,
      newEmail,
      personId,
      phone,
      city,
      gender,
    } = req.body;
    const avatar = req.file;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "Can't find user, Try Again!" });
    }

    const updateData = {
        updateDate: new Date(),
    };

    if (firstName) updateData.first_name = firstName;
    if (middleName) updateData.middle_name = middleName;
    if (lastName) updateData.last_name = lastName;
    if (newEmail) updateData.email = newEmail;
    if (personId) updateData.personId = personId;
    if (phone) updateData.phone = phone;
    if (city) updateData.city = city;
    if (gender) updateData.gender = gender;
    if (avatar) updateData.avatar = avatar.buffer;

    const updatedUser = await User.findByIdAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "Can't Find User, Try Again!" });
    }

    if (oldPassword && newPassword) {
      const correctPassword = await bcrypt.compare(
        oldPassword,
        foundUser.password
      );
      if (!correctPassword) {
        return res
          .status(400)
          .json({ message: "Old Password isn't correct, Please Try Again!" });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, process.env.HASH);
    const updatedPass = {
        updateDate: new Date(),
        password: hashedPassword,
    };

    const updatedPassword = await User.findByIdAndUpdate(
      { userId },
      { $set: updatedPass },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { productId, name, price, description, deleteOldImages } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = {
      updateDate: new Date(),
    };

    if (name) updateData["name"] = name;
    if (price) updateData["price"] = price;
    if (description) updateData["description"] = description;

    if (req.files?.mainImage) {
      updateData["mainImage"] = req.files.mainImage[0].buffer; // Replace with new main image
    }

    if (req.files?.multiImage) {
      const newImages = req.files.multiImage.map((file) => file.buffer);

      if (deleteOldImages === "yes") {
        updateData["multiImage"] = newImages;
      } else {
        updateData["multiImage"] = [...product.multiImage, ...newImages];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error: " + err.message });
  }
};
