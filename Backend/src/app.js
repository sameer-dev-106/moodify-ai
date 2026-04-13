const express = require("express");
const cookieParser = require("cookie-parser");

const app = express ();
app.use(express.json());
app.use(cookieParser());

/* Require Routes */
const authRoutes = require("./routes/auth.routes");

/* Using Routes */
app.use("/api/auth", authRoutes);


module.exports = app;