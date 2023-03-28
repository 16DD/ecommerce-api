const _ = require("lodash");

//-- get specific fileds of object
const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

module.exports = {
  getInfoData,
};
