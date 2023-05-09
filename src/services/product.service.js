const { clothesModel, productModel, electronicModel, furnitureModel } = require("../models/product.model");
const { BadRequestError } = require("../core/error.respone");
const {
    findAllDraftsForShop,
    findAllPublishForShop,
    publishProductByShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById
} = require("../models/repositories/product.repo");
const { removeUndefinedObject, updateNestedObjectParser } = require("../utils");
const { insertInventory } = require("../models/repositories/inventory.repo");

class ProductFactory {
    static productRegister = {};

    static registerProductType(type, classRef) {
        ProductFactory.productRegister[type] = classRef;
    }

    static async create(type, payload) {
        const productClass = ProductFactory.productRegister[type];
        if (!productClass) throw new BadRequestError("Invalid type product");
        return new productClass(payload).create();
    }

    static async updateProduct(type, productId, payload) {
        const productClass = ProductFactory.productRegister[type];
        if (!productClass) throw new BadRequestError("Invalid type product");
        return new productClass(payload).updateProduct(productId);
    }

    static async publishProductByShop({ product_shop, product_id }) {
        return await publishProductByShop({ product_shop, product_id });
    }

    static async unPublishProductByShop({ product_shop, product_id }) {
        return await unPublishProductByShop({ product_shop, product_id });
    }

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true };
        return await findAllDraftsForShop({ query, limit, skip });
    }

    static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true };
        return await findAllPublishForShop({ query, limit, skip });
    }

    static async getListSearchProduct({ keySearch }) {
        return await searchProductByUser({ keySearch });
    }

    static async findAllProducts({ limit = 50, sort = "ctime", page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit,
            sort,
            filter,
            page,
            select: ["product_name", "product_price", "product_thumb"]
        });
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id, unSelect: ["__v"] });
    }
}

class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_slug,
        product_quantity,
        product_type,
        product_shop,
        product_attributes,
        product_ratingsAverage,
        product_variations
    }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_slug = product_slug;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
        this.product_variations = product_variations;
        this.product_ratingsAverage = product_ratingsAverage;
    }
    //-- create new product
    async create(product_id) {
        const newProduct = await productModel.create({ ...this, _id: product_id });
        //-- add product_stock in inventory collecion
        if (newProduct) {
            await insertInventory({ productId: newProduct._id, shopId: this.product_shop, stock: this.product_quantity });
        }
        return newProduct;
    }

    //-- update product
    async updateProduct(productId, bodyUpdate) {
        return await updateProductById({ productId, bodyUpdate, model: productModel });
    }
}

class Clothing extends Product {
    async create() {
        const newClothing = await clothesModel.create({ ...this.product_attributes, product_shop: this.product_shop });
        if (!newClothing) throw new BadRequestError("Create new clothing error");

        const newProduct = await super.create(newClothing._id);
        if (!newProduct) throw new BadRequestError("Create new product error");
        return newProduct;
    }

    async updateProduct(productId) {
        //-- remove atr has null and undefined
        const objectParams = removeUndefinedObject(this);

        //-- update product child
        if (objectParams.product_attributes) {
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(removeUndefinedObject(objectParams.product_attributes)),
                model: clothesModel
            });
        }
        //-- update product father
        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams));

        return updateProduct;
    }
}

class Electronics extends Product {
    async create() {
        const newElectronic = await electronicModel.create({ ...this.product_attributes, product_shop: this.product_shop });
        if (!newElectronic) throw new BadRequestError("Create new clothing error");
        const newProduct = await super.create(newElectronic._id);
        if (!newProduct) throw new BadRequestError("Create new product error");
        return newProduct;
    }

    async updateProduct(productId) {
        //-- remove atr has null and undefined
        const objectParams = removeUndefinedObject(this);

        //-- update product child
        if (objectParams.product_attributes) {
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(removeUndefinedObject(objectParams.product_attributes)),
                model: electronicModel
            });
        }
        //-- update product father
        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams));

        return updateProduct;
    }
}

class Furnitures extends Product {
    async create() {
        const newFurniture = await furnitureModel.create({ ...this.product_attributes, product_shop: this.product_shop });
        if (!newFurniture) throw new BadRequestError("Create new clothing error");
        const newProduct = await super.create(newFurniture._id);
        if (!newProduct) throw new BadRequestError("Create new product error");
        return newProduct;
    }

    async updateProduct(productId) {
        //-- remove atr has null and undefined
        const objectParams = removeUndefinedObject(this);

        //-- update product child
        if (objectParams.product_attributes) {
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(removeUndefinedObject(objectParams.product_attributes)),
                model: furnitureModel
            });
        }
        //-- update product father
        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams));

        return updateProduct;
    }
}

ProductFactory.registerProductType("Electronic", Electronics);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furniture", Furnitures);

module.exports = ProductFactory;
