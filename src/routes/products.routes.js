const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/products.controller");
const multer = require("multer");
const requireSignIn = require("../middlewares/auth.middleware");

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); //generate unique file name
  },
});

const upload = multer({ storage: storage });

//in frontend name should be file
router.post("/create", requireSignIn, upload.single("file"), createProduct);

module.exports = router;
