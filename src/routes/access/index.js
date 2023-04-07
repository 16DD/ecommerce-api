const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");

//SignIn
router.post("/shop/signin", asyncHandle(accessController.signIn));
//SignUp
router.post("/shop/signup", asyncHandle(accessController.signUp));

//Authentication
router.use(asyncHandle(authentication));
//Handle refresh token
router.post("/shop/handleRefreshToken", asyncHandle(accessController.handleRefrestoken));
//LogOut
router.post("/shop/logout", asyncHandle(accessController.logOut));

module.exports = router;
