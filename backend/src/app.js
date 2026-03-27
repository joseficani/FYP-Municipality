require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

const eventsRoutes = require("./routes/events.routes");
const newsRoutes = require("./routes/news.routes");
const permitsRoutes = require("./routes/permits.routes");
const permitsCatalogRoutes = require("./routes/permitsCatalog.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
// const taxesRoutes = require("./routes/taxes. Routes");
const taxCatalogRoutes = require("./routes/taxCatalog.routes");
const taxApplicationRoutes = require("./routes/taxApplication.routes");
const contactRoutes = require("./routes/contact.routes");
const translateRoutes = require("./routes/translateRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/permits", permitsRoutes);
app.use("/api/permits-catalog", permitsCatalogRoutes);
// app.use("/api/taxes", taxesRoutes);
app.use("/api/tax-catalog", taxCatalogRoutes);
app.use("/api/tax-applications", taxApplicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/translate", translateRoutes);

app.use((err, req, res, next) => {
  console.error("Global error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

module.exports = app;