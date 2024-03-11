const Product = require("../models/products.model");

const createProduct = async (req, res) => {
  try {
    //check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const { title, description } = req.body;
    const imageUrl = req.file.path;

    //create a new product instance
    const newProduct = new Product({
      title,
      description,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product", error.message);
    res.status(500).json({
      message: `Failed to create product ${error.message}`,
      error: error.message,
    });
  }
};

module.exports = { createProduct };
