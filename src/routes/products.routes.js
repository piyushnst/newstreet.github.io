const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/products.controller");
const multer = require("multer");
const requireSignIn = require("../middlewares/auth.middleware");

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    const appTitle = req.body.title || "DefaultAppTitle";
    const sanitizedAppTitle = appTitle
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    const fileExtension = file.originalname.split(".").pop();
    const finalFileName = `${sanitizedAppTitle}.${fileExtension}`;

    cb(null, finalFileName);
  },
});

const upload = multer({ storage: storage });

//in frontend name should be file
// name file
router.post("/create", requireSignIn, upload.single("file"), createProduct);
router.get("/", getProducts);

module.exports = router;
