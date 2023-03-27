const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const RoleShop = {
  SHOP: "10001",
  WRITER: "10002",
  EDITER: "10003",
  ADMIN: "10004",
};
class AccessService {
  static signUp = async (name, email, password) => {
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log({ publicKey, privateKey });
        return { publicKey, privateKey };
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
