require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");


const app = express();

app.use(express.json());
app.use(cors());



connectDB();

app.use("/expenses",expenseRoutes);
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

// app.get("/test" , (req,res) => res.json({messsage:"Working"}));
// app.use()

app.listen(5000, () => {
  console.log("Server running on port 5000");
});