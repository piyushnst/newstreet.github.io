const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://piyushgupta:nicolatesla@cluster0.5zljmkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`Connected to MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in =MongoDB ${error}`);
  }
};

module.exports = connectDB;
