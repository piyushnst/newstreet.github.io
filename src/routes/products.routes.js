const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const multer = require("multer");
const requireSignIn = require("../middlewares/auth.middleware");

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/products");
  },
  filename: function (req, file, cb) {
    let appTitle = req.body.title || "DefaultAppTitle";
    appTitle = appTitle.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase(); // Sanitize the title

    // Determine the part of the title to use based on its length
    const titlePart = appTitle.length > 5 ? appTitle.substring(0, 5) : appTitle;

    const fileExtension = file.originalname.split(".").pop();
    const finalFileName = `${titlePart}.${fileExtension}`;

    cb(null, finalFileName);
  },
});

const upload = multer({ storage: storage });

//in frontend name should be file
// name file
router.post("/create", requireSignIn, upload.single("file"), createProduct);
router.get("/", getProducts);
// Assuming `upload` is your multer instance configured for handling file uploads
router.put("/:id", requireSignIn, upload.single("file"), updateProduct);
router.delete("/:id", requireSignIn, deleteProduct);

module.exports = router;
