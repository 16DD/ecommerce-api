const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId };
            const update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken };
            const options = { upsert: true, new: true }; // create if not find and return new key.

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);
            return tokens ? tokens : null;
        } catch (error) {
            return error.message;
        }
    };
}
module.exports = KeyTokenService;
