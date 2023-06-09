const bcrypt = require("bcrypt");
const KeyTokenService = require("./keytoken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData, createKeyPair } = require("../utils");
const { BadRequestError, AuthFailureError } = require("../core/error.respone");
const ShopService = require("./shop.service");

class AccessService {
    static handleRefreshToken = async ({ user, keyStore, refreshToken }) => {
        const { userId, email } = user;
        //--check refresh token used
        if (keyStore.refreshTokenUsed.includes(refreshToken)) {
            console.log("Token used");
            await KeyTokenService.removeById(userId);
            throw new BadRequestError("Something wrong happned !!");
        }
        //--compare refresh token
        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError("Shop not regisrted");
        //--check shop
        const foundShop = await ShopService.findByEmail({ email });
        if (!foundShop) AuthFailureError("Shop not regiser 1");
        //--create key pair
        const { privateKey, publicKey } = createKeyPair();
        //--generate token pair
        const tokens = createTokenPair(
            {
                userId: foundShop._id,
                email
            },
            publicKey,
            privateKey
        );

        //--update key store
        await KeyTokenService.findAndUpdate({ userId, publicKey, privateKey, refreshToken: tokens.refreshToken, refreshTokenUsed: refreshToken });

        return {
            user,
            tokens
        };
    };

    static sigIn = async ({ email, password, refreshToken = null }) => {
        //--check email
        const foundShop = await ShopService.findByEmail({ email });
        if (!foundShop) {
            throw new AuthFailureError("Shop not registered");
        }
        //--check password
        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new AuthFailureError("Authentication error");
        }
        //--create key pair
        const { privateKey, publicKey } = createKeyPair();
        //--generate token pair
        const tokens = createTokenPair(
            {
                userId: foundShop._id,
                email
            },
            publicKey,
            privateKey
        );

        //create keystore
        const keyStore = await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        });
        if (!keyStore) {
            throw new BadRequestError("Create keystore");
        }

        return {
            shop: getInfoData({
                fileds: ["_id", "name", "email"],
                object: foundShop
            }),
            tokens
        };
    };

    static signUp = async ({ name, email, password }) => {
        //--check email
        const holderShop = await ShopService.findByEmail({ email });

        if (holderShop) {
            throw new BadRequestError("Shop already registered!");
        }
        //--create shop
        const passwordHash = await bcrypt.hash(password, 10);
        const newShop = await ShopService.create({
            name,
            email,
            password: passwordHash
        });
        //--create key
        if (newShop) {
            const { privateKey, publicKey } = createKeyPair();

            //--jwt create token
            const tokens = createTokenPair(
                {
                    userId: newShop._id,
                    email
                },
                publicKey,
                privateKey
            );

            //create keystore
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            });
            if (!keyStore) {
                throw new BadRequestError("Create keystore");
            }

            return {
                shop: getInfoData({
                    fileds: ["_id", "name", "email"],
                    object: newShop
                }),
                tokens
            };
        }
    };

    static logOut = async (keyStore) => {
        return await KeyTokenService.removeById(keyStore._id);
    };
}

module.exports = AccessService;
