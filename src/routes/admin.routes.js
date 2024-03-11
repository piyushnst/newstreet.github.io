const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  registerAdmin,
} = require("../controllers/admin.controller");

router.post("/create", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
