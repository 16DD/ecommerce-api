const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();
const { asyncHandle } = require("../../auth/checkAuth");
//SignUp
router.post("/shop/signup", asyncHandle(accessController.signUp));

module.exports = router;
