//--Authentication API
const JWT = require("jsonwebtoken");
const { AuthFailureError, NotFoundError } = require("../core/error.respone");
const KeyTokenService = require("../services/keytoken.service");
const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
    CLIENT_ID: "x-client-id",
    REFRESHTOKEN: "x-rtoken-key"
};

const createTokenPair = (payload, publicKey, privateKey) => {
    try {
        //-- accessToken and refreshToken
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: "1 day"
        });
        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: "1 day"
        });
        return { accessToken, refreshToken };
    } catch (error) {
        return error;
    }
};

const authentication = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    //-- Check user missing
    if (!userId) {
        throw new AuthFailureError("Invalid request");
    }
    //-- Check keystore
    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) {
        throw new NotFoundError("Not found keyStore");
    }

    //check refresh token -> route refresh token
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    if (refreshToken) {
        const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError("Invalid userId");
        req.keyStore = keyStore;
        req.user = decodeUser;
        req.refreshToken = refreshToken;
        return next();
    }

    //-- check accesstoken -> route logout
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) {
        throw new AuthFailureError("Invalid request");
    }

    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (decodeUser.userId !== userId) {
        throw new AuthFailureError("Invalid userId");
    }
    req.keyStore = keyStore;
    return next();
};

module.exports = {
    createTokenPair,
    authentication
};
