const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");

const createAdmin = async (req, res) => {
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
  } catch (error) {
    console.error("Cannot login admin", error.message);
    res.status(500).json({
      message: `Failed to login due to an inetrnal error ${error.message}`,
    });
  }
};

module.exports = createAdmin;
