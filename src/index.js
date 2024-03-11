const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin.routes");
//database connection
connectDB();

//object instance
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route

app.use("/admin/api/v1", adminRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
