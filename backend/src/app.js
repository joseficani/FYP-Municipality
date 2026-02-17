require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Municipality API is running...");
});

// ✅ Debug route must be BEFORE notFound/errorHandler
app.get("/debug/routes", (req, res) => {
  res.send("debug ok");
});

// API routes
app.use("/api", routes);

// Error handling MUST be last
app.use(notFound);
app.use(errorHandler);

module.exports = app;
