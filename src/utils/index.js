const _ = require("lodash");
const crypto = require("node:crypto");
//-- get specific fileds of object
const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds);
};

//-- create keypare random
const createKeyPair = () => {
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    return { privateKey, publicKey };
};

module.exports = {
    getInfoData,
    createKeyPair
};
