const express = require("express");
const router = express.Router();

//controllers
const createAdmin = require("../controllers/admin.controller");

router.post("/create", createAdmin);

module.exports = router;
