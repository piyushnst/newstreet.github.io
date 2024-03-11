const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const { comparePasswords, hashPassword } = require("../utils/passwordUtils");

const JWT_SECRET = "Usmaan123";
//CONTROLLERS
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const adminExists = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (adminExists) {
      return res.status(400).json({
        messsage: "An admin with this username or email already exists",
      });
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    //create a new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    //save data to the database
    await newAdmin.save();

    //respond
    res.status(201).json({
      message: "Admin created successfully!",
      data: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Error in creating user", error.message);
    res.status(500).json({
      message: `Failed to create amdin due to internal error ${error.message}`,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //find amdin by username
    const admin = await Admin.findOne({
      username: username,
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found!",
      });
    }

    //comparing password with hashed password in DB
    const isMatch = await comparePasswords(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    //generate JWT
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Cannot login admin", error.message);
    res.status(500).json({
      message: `Failed to login due to an inetrnal error ${error.message}`,
    });
  }
};

module.exports = { registerAdmin, loginAdmin };
