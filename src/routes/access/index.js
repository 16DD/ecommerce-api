const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();
const { asyncHandle } = require("../../auth/checkAuth");

//SignIn
router.post("/shop/sigin", asyncHandle(accessController.singIn));
//SignUp
router.post("/shop/signup", asyncHandle(accessController.signUp));

module.exports = router;
