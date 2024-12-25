const User = require("../model/users");
const Product = require("../model/product");
const Categories = require("../model/categories");
module.exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deletedUser = await User.findByIdAndDelete(user_id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(product_id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" + err.message });
  }
};

module.exports.deleteCategories = async (req, res) => {
  try {
    const { category_Id } = req.params;
    const deletedCategory = await Categories.findByIdAndDelete(category_Id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status().json({ message: "Internal Server Error" + err.message });
  }
};
