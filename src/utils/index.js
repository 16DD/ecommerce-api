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
//-- convert [['name':1],['value':1]] => {'name':1, 'value':1}
const getSelectData = (select = []) => {
    const entries = select.map((el) => [el, 1]);
    return Object.fromEntries(entries);
};

const unGetSelectData = (select = []) => {
    const entries = select.map((el) => [el, 0]);
    return Object.fromEntries(entries);
};

module.exports = {
    getInfoData,
    createKeyPair,
    getSelectData,
    unGetSelectData
};
