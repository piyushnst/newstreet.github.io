const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const requireSignIn = require("./middlewares/auth.middleware");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/products.routes");
const newsRoutes = require("./routes/news.routes");
const aboutRoutes = require("./routes/about.routes");
require("dotenv").config();

//database connection
connectDB();

global.__basedir = __dirname + "/..";

//object instance
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.use("/api/v1", adminRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/about", aboutRoutes);

//check protected route  test
app.get("/protected-route", requireSignIn, (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
      message: "Protected-Route Verified",
    });
  } catch (error) {
    console.error("Error in accessing protected route demo", error.message);
    res.status(500).json({
      message: `Error in accessing test protected route ${error.message}`,
    });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
