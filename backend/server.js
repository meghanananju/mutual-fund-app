require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoute");
const fundRoutes = require("./routes/fundRoutes");
require("./models/database")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/funds", fundRoutes);

module.exports = app;
