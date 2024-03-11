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

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    // Assuming the product ID is provided in the URL as a parameter
    const productId = req.params.id;

    // Extracting title and description directly from the request body to ensure only these fields are used
    const { title, description } = req.body;

    // Initialize an object to hold the fields to update
    const productUpdates = {
      title,
      description,
    };

    // Check if a new image file was uploaded during the update
    if (req.file) {
      // If there's a new image, add its path to the updates object
      productUpdates.imageUrl = req.file.path;
    }

    // Update the product in the database
    // findByIdAndUpdate takes the ID, the update operations, and options. { new: true } returns the updated document.
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productUpdates,
      { new: true }
    );

    // If no product is found with the given ID, return a 404 error
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the updated product
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(`Error in updating product: ${error.message}`);
    res.status(500).json({
      message: `Error in updating product: ${error.message}`,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Attempt to find the product by ID to ensure it exists before attempting deletion
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Proceed with deletion using findByIdAndDelete instead of findByIdAndRemove
    await Product.findByIdAndDelete(productId);

    // Respond with a success message
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(`Error in deleting product: ${error.message}`);
    res.status(500).json({
      message: `Error in deleting product: ${error.message}`,
    });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
