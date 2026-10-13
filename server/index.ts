import "dotenv/config";

import express from "express";

// const express = require("express");

import connectDB from "./config/db";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from "./routes/authRoutes";

import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());



connectDB();

app.use("/expenses",expenseRoutes);
app.use("/auth",authRoutes);
// app.use("/user",userRoutes);
// app.use("/upload", uploadRoutes);
// app.use("/uploads", express.static("uploads"));

// app.get("/test" , (req,res) => res.json({messsage:"Working"}));
// app.use()

app.listen(5000, () => {
  console.log("Server running on port 5000");
});