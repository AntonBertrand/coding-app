require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// MongoDB Connection
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    console.log("Using cached database connection");
    return cachedDb;
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    console.log(
      "MongoDB URI:",
      process.env.MONGODB_URI ? "Present" : "Missing"
    );

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    cachedDb = conn;
    console.log("Connected to MongoDB successfully");
    return conn;
  } catch (err) {
    console.error("MongoDB connection error details:", {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack,
    });
    throw err;
  }
};

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    if (!mongoose.connection.readyState) {
      console.log("Database not connected, attempting to connect...");
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("Database connection middleware error:", err);
    res.status(500).json({
      message: "Database connection failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// Routes
app.use("/api/languages", require("./routes/languages"));
app.use("/api/topics", require("./routes/topics"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/progress", require("./routes/progress"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", {
    message: err.message,
    stack: err.stack,
    name: err.name,
  });
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Export the Express app as a serverless function
module.exports = app;
