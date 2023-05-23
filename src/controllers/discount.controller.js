const { CREATED, SuccessResponse } = require("../core/success.response");
const DiscountService = require("../services/discount.service");

class DiscountController {
    createDiscountCode = async (req, res, next) => {
        new SuccessResponse({
            message: "Successful code generation",
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res);
    };

    getAllDiscountCodes = async (req, res, next) => {
        new SuccessResponse({
            message: "Successful code found",
            metadata: await DiscountService.getAllDiscountCodeByShop({
                ...req.query,
                shopId: req.user.userId
            })
        }).send(res);
    };

    getDiscountAmount = async (req, res, next) => {
        new SuccessResponse({
            message: "Successful get discount amount",
            metadata: await DiscountService.getDiscountAmount({
                ...req.body
            })
        }).send(res);
    };

    getallDiscountWithProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Successful get discount amount",
            metadata: await DiscountService.getAllDiscountCodeWithProduct({
                ...req.query
            })
        }).send(res);
    };
}

module.exports = new DiscountController();
