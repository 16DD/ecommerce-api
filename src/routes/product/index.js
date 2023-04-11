const express = require("express");
const router = express.Router();
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");
const ProductController = require("../../controllers/product.controller");

//Authentication
router.use(asyncHandle(authentication));

router.post("", asyncHandle(ProductController.create));

//Query

router.get("/drafts/all", asyncHandle(ProductController.getAllDraftsForShop));

module.exports = router;
