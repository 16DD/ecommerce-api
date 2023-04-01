//-- Authorization API
const ApiKeyService = require("../services/apikey.service");

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization"
};
//--Check API
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: "Forbidden Error"
            });
        }

        const objKey = await ApiKeyService.findById(key);
        if (!objKey) {
            return res.status(403).json({
                message: "Forbidden Error"
            });
        }

        req.objKey = objKey;
        return next();
    } catch (error) {
        return next(error);
    }
};

//--Check permission

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "Permission denied"
            });
        }

        const validPermisstion = req.objKey.permissions.includes(permission);
        if (!validPermisstion) {
            return res.status(403).json({
                message: "Permission denied"
            });
        }
        return next();
    };
};

//-- Handle error middleware

const asyncHandle = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

module.exports = {
    apiKey,
    permission,
    asyncHandle
};
