const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shops"
        },
        publicKey: {
            type: String,
            required: true
        },
        privateKey: {
            type: String,
            required: true
        },
        refreshTokenUsed: {
            type: Array,
            default: []
        },
        refreshToken: {
            type: String
        }
    },
    {
        collation: COLLECTION_NAME,
        timestamps: true
    }
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
