const Product = require("../model/product");
const User = require("../model/users");
const Category = require("../model/categories");
module.exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      mainImage: `data:image/jpeg;base64,${product.mainImage.toString(
        "base64"
      )}`,
      multiImage: product.multiImage.map(
        (imageBuffer) =>
          `data:image/jpeg;base64,${imageBuffer.toString("base64")}`
      ),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res.status(200).json({
      message: "Products retrieved successfully",
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" + err.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error!" + err.message });
  }
};
