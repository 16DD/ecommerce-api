const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECOND_CHECK = 5000;

//-- Count connect
const countConnect = () => {
    return mongoose.connections.length;
};

//-- Check overload
const checkOverLoad = () => {
    setInterval(() => {
        const numConnecting = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memUsage = process.memoryUsage().rss;
        const maxConnections = 5;

        console.log(`Active connections: ${numConnecting}`);
        console.log(`Memory usage: ${memUsage / 1024 / 1024} MB`);
        console.log(`Cores: ${numCores}`);

        if (numConnecting > maxConnections) {
            console.log("Connection overload");
        }
    }, _SECOND_CHECK);
};

module.exports = { countConnect, checkOverLoad };
