if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const route = require("./routes");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", route);
app.use(errorHandler);

module.exports = app;
