const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");

//SignIn
router.post("/shop/sigin", asyncHandle(accessController.singIn));
//SignUp
router.post("/shop/signup", asyncHandle(accessController.signUp));

//Authentication
router.use(asyncHandle(authentication));

//LogOut
router.post("/shop/logout", asyncHandle(accessController.logOut));
module.exports = router;
