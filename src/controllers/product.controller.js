const { CREATED, SuccessResponse } = require("../core/success.response");
const ProductFactory = require("../services/product.service");

class ProductController {
    create = async (req, res) => {
        new SuccessResponse({
            message: "Create product success",
            metadata: await ProductFactory.create(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res);
    };
}

module.exports = new ProductController();
