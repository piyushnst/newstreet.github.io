const express = require("express");
const router = express.Router();
const { createAbout , getAbout} = require("../controllers/about.controller");
const multer = require("multer");
const requireSignIn = require("../middlewares/auth.middleware");

//multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__basedir}/uploads/about`);
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

router.post("/create", requireSignIn, upload.single("file"), createAbout);
router.get("/", getAbout);


module.exports = router;
