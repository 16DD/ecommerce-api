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

    publishProductByShop = async (req, res) => {
        new SuccessResponse({
            message: "Publish success",
            metadata: await ProductFactory.publishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            })
        }).send(res);
    };

    unPublishProductByShop = async (req, res) => {
        new SuccessResponse({
            message: "Publish success",
            metadata: await ProductFactory.unPublishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            })
        }).send(res);
    };

    //--Query
    getAllDraftsForShop = async (req, res) => {
        new SuccessResponse({
            message: "Get list draft success",
            metadata: await ProductFactory.findAllDraftsForShop({ product_shop: req.user.userId })
        }).send(res);
    };

    getAllPublishForShop = async (req, res) => {
        new SuccessResponse({
            message: "Get list draft success",
            metadata: await ProductFactory.findAllPublishForShop({ product_shop: req.user.userId })
        }).send(res);
    };

    getListSearchProduct = async (req, res) => {
        new SuccessResponse({
            message: "Get list search success",
            metadata: await ProductFactory.getListSearchProduct(req.params)
        }).send(res);
    };
}

module.exports = new ProductController();
