// service/app.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json({ limit: "100mb" }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
    exposedHeaders: [
      "Location",
      "Content-Type",
      "Content-Description",
      "Content-Disposition",
      "Expires",
      "Cache-Control",
      "Pragma",
      "Content-Length",
      "Content-Range",
      "Max-Parts",
      "File-Part",
      "Temp-Name",
    ],
    credentials: true,
  })
);

// Routes
app.use("/v1/users", userRoutes);

// Error handler MUST be last
app.use(errorHandler);

module.exports = app;
