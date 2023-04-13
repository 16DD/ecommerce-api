const { productModel, clothesModel, furnitureModel, electronicModel } = require("../product.model");
const { Types } = require("mongoose");
const { getSelectData, unGetSelectData } = require("../../utils");
const publishProductByShop = async ({ product_shop, product_id }) => {
    const foundProduct = await productModel.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    });

    if (!foundProduct) return null;
    foundProduct.isDraft = false;
    foundProduct.isPublished = true;

    const { modifiedCount } = await foundProduct.updateOne(foundProduct);
    return modifiedCount;
};

const unPublishProductByShop = async ({ product_shop, product_id }) => {
    const foundProduct = await productModel.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    });

    if (!foundProduct) return null;
    foundProduct.isDraft = true;
    foundProduct.isPublished = false;

    const { modifiedCount } = await foundProduct.updateOne(foundProduct);
    return modifiedCount;
};

const findAllDraftsForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip });
};

const findAllPublishForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip });
};

const searchProductByUser = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch);
    const results = await productModel
        .find({ isPublished: true, $text: { $search: regexSearch } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .lean();

    return results;
};

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const products = await productModel.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean();
    return products;
};

const findProduct = async ({ product_id, unSelect }) => {
    return await productModel.findById(product_id).select(unGetSelectData(unSelect));
};

const queryProduct = async ({ query, skip, limit }) => {
    return await productModel
        .find(query)
        .populate("product_shop", "name email -_id")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
};

module.exports = {
    findAllDraftsForShop,
    findAllPublishForShop,
    publishProductByShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct
};
