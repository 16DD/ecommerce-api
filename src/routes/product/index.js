const express = require("express");
const router = express.Router();
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");
const ProductController = require("../../controllers/product.controller");

router.get("/search/:keySearch", asyncHandle(ProductController.getListSearchProduct));

//Authentication
router.use(asyncHandle(authentication));

router.post("", asyncHandle(ProductController.create));
router.post("/publish/:id", asyncHandle(ProductController.publishProductByShop));
router.post("/unpublish/:id", asyncHandle(ProductController.unPublishProductByShop));
//Query

router.get("/drafts/all", asyncHandle(ProductController.getAllDraftsForShop));
router.get("/published/all", asyncHandle(ProductController.getAllPublishForShop));

module.exports = router;
