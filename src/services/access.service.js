const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keytoken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const RoleShop = {
  SHOP: "10001",
  WRITER: "10002",
  EDITER: "10003",
  ADMIN: "10004",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //--check email
      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        return {
          code: "aaa",
          message: "Shop already registered",
        };
      }
      //--create shop
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      //--create key
      if (newShop) {
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        //--create keystore
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          privateKey,
          publicKey,
        });

        if (!keyStore) {
          return {
            message: "Create key store error",
            status: "error",
          };
        }

        //--jwt create token
        const tokens = createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey
        );

        return {
          code: "success",
          metadata: getInfoData({
            fileds: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        };
      }
    } catch (error) {
      return {
        code: "aaa",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
