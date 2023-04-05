const { default: mongoose } = require("mongoose");
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId) }).lean();
    };
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        const filter = { user: userId };
        const update = { publicKey, privateKey, refreshToken };
        const options = { upsert: true, new: true }; // create if not find and return new key.

        const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);
        return tokens ? tokens.publicKey : null;
    };

    static removeById = async (userId) => {
        return await keyTokenModel.deleteOne({ _id: new mongoose.Types.ObjectId(userId) });
    };

    static findAndUpdate = async ({ userId, publicKey, privateKey, refreshToken, refreshTokenUsed }) => {
        await keyTokenModel.updateOne(
            { user: userId },
            {
                $set: {
                    privateKey,
                    publicKey,
                    refreshToken: refreshToken
                },
                $addToSet: {
                    refreshTokenUsed: refreshTokenUsed
                }
            }
        );
    };
}
module.exports = KeyTokenService;
