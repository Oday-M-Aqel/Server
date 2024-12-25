const Product = require("../model/product");
const Categories = require("../model/categories");
module.exports.addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!req.files || !req.files.mainImage || !req.files.multiImage) {
      return res
        .status(400)
        .json({ error: "Main image and multi-images are required" });
    }

    const mainImage = req.files.mainImage[0].buffer;
    const multiImage = req.files.multiImage.map((file) => file.buffer);
    const newProduct = new Product({
      name,
      price,
      description,
      mainImage,
      multiImage,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the product" });
  }
};

module.exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file;

    const foundedCategory = await Categories.findOne({ name: name });

    if (foundedCategory) {
      return res.status(400).json({ message: "Category is already exist" });
    }

    const category = {
      name: name,
      description: description,
      image: image.buffer,
    };
  } catch (err) {
    console.log(err.message);
    res.status.json({ message: "Internal Server Error" + err.message });
  }
};


