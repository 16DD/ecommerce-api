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

const removeUndefinedObject = (obj) => {
    Object.keys(obj).forEach((k) => {
        if (obj[k] == null) {
            delete obj[k];
        }
    });
    return obj;
};

/* 
-- convert
    const a = {
        b : {
            v:1
        }
    }
    ======>
    db.collection.updateOne({`a.b`:1})
*/

const updateNestedObjectParser = (obj) => {
    const final = {};
    Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
            const response = updateNestedObjectParser(obj[k]);
            Object.keys(response).forEach((a) => {
                final[`${k}.${a}`] = response[a];
            });
        } else {
            final[k] = obj[k];
        }
    });
    return final;
};

module.exports = {
    getInfoData,
    createKeyPair,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser
};
