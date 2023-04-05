const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//-- Init middlewares
app.use(morgan("dev")); // combined || tiny ...
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

//-- Init db
require("./dbs/init.mongodb");

//-- Init routes
app.use("/", require("./routes"));

//-- Handle error
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "Error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error "
    });
});

module.exports = app;
