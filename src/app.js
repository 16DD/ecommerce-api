const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//-- Init middlewares
app.use(morgan("dev")); // combined || tiny ...
app.use(helmet());
app.use(express.json());
app.use(compression());

//-- Init db
require("./dbs/init.mongodb");

//-- Init routes
app.use("/", require("./routes"));

module.exports = app;
