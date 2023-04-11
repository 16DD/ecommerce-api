const { productModel, clothesModel, furnitureModel, electronicModel } = require("../product.model");

const findAllDraftsForShop = async ({ query, limit, skip }) => {
    return await productModel
        .find(query)
        .populate("product_shop", "name email -_id")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
};

module.exports = {
    findAllDraftsForShop
};
