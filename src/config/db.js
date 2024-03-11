const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/nstapi");
    console.log(`Connected to MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in =MongoDB ${error}`);
  }
};

module.exports = connectDB;
