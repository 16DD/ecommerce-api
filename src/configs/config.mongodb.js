require("dotenv").config();

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3030
    },
    db: {
        url: process.env.DEV_DB_URL || "localhost:2017/ShopDev"
    }
};

const production = {
    app: {
        port: process.env.PRO_APP_PORT || 3030
    },
    db: {
        url: process.env.PRO_DB_URL || "localhost:2017/Shop"
    }
};

const config = { dev, production };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
