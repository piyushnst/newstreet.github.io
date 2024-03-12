const express = require("express");
const router = express.Router();
const {
  createNews,
  getNews,
  getNewsById,
} = require("../controllers/news.controller");
const multer = require("multer");
const requireSignIn = require("../middlewares/auth.middleware");

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__basedir}/uploads/news`);
  },
  filename: function (req, file, cb) {
    let appTitle = req.body.title || "DefaultNewsTitle";
    appTitle = appTitle.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase(); // Sanitize the title

    // Determine the part of the title to use based on its length
    const titlePart = appTitle.length > 5 ? appTitle.substring(0, 5) : appTitle;

    const fileExtension = file.originalname.split(".").pop();
    const finalFileName = `${titlePart}.${fileExtension}`;

    cb(null, finalFileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/create", requireSignIn, upload.single("file"), createNews);

module.exports = router;
