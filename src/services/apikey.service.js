const apikeyModel = require("../models/apikey.model");

class ApiKeyService {
  static findById = async (key) => {
    const objectKey = await apikeyModel.findOne({ key, status: true }).lean();
    return objectKey;
  };
  static create = async ({ key, permissions }) => {
    const newObjKey = await apikeyModel.create({ key, permissions });
    return newObjKey;
  };
}

module.exports = ApiKeyService;
