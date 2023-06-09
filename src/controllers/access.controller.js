const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    handleRefrestoken = async (req, res) => {
        new SuccessResponse({
            message: "Refresh token success!",
            metadata: await AccessService.handleRefreshToken({
                user: req.user,
                keyStore: req.keyStore,
                refreshToken: req.refreshToken
            })
        }).send(res);
    };
    signIn = async (req, res) => {
        new SuccessResponse({ message: "Login success", metadata: await AccessService.sigIn(req.body) }).send(res);
    };
    signUp = async (req, res) => {
        new CREATED({
            message: "Regiter success",
            metadata: await AccessService.signUp(req.body)
        }).send(res);
    };
    logOut = async (req, res) => {
        new SuccessResponse({ message: "Logout success", metadata: await AccessService.logOut(req.keyStore) }).send(res);
    };
}

module.exports = new AccessController();
