const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");

const router = express.Router();

// const crypto = require("node:crypto");
// const ApiKeyService = require("../services/apikey.service");
// router.use(async (req, res, next) => {
//   const key = crypto.randomBytes(64).toString("hex");
//   await ApiKeyService.create({ key, permissions: ["0000"] });
//   next();
// });
//--Check api key
router.use(apiKey);
router.use(permission("0000"));

router.use("/v1/api/discount/", require("./discount"));
router.use("/v1/api/product/", require("./product"));
router.use("/v1/api/shop/", require("./access"));

module.exports = router;
