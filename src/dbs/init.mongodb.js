const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
    db: { url }
} = require("../configs/config.mongodb");

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose
            .connect(url)
            .then((_) => {
                console.log("Connected Mongo Success", countConnect());
            })
            .catch((error) => {
                console.log("Error Connect!!!");
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

module.exports = Database.getInstance();
