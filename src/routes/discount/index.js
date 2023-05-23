const express = require("express");
const router = express.Router();
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");
const DiscountController = require("../../controllers/discount.controller");

// user get amount discount
router.post("/amount", asyncHandle(DiscountController.getDiscountAmount));
router.get("/list_product_code", asyncHandle(DiscountController.getallDiscountWithProduct));

//authentication
router.use(asyncHandle(authentication));

router.post("", asyncHandle(DiscountController.createDiscountCode));
router.get("", asyncHandle(DiscountController.getAllDiscountCodes));

module.exports = router;
