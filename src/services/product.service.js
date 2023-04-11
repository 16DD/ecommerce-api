const { clothesModel, productModel, electronicModel, furnitureModel } = require("../models/product.model");
const { BadRequestError } = require("../core/error.respone");
const { findAllDraftsForShop } = require("../models/repositories/product.repo");
const { default: mongoose } = require("mongoose");

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

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true };
        return await findAllDraftsForShop({ query, limit, skip });
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

    async create(product_id) {
        return await productModel.create({ ...this, _id: product_id });
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
}

class Electronics extends Product {
    async create() {
        const newElectronic = await electronicModel.create({ ...this.product_attributes, product_shop: this.product_shop });
        if (!newElectronic) throw new BadRequestError("Create new clothing error");
        const newProduct = await super.create(newElectronic._id);
        if (!newProduct) throw new BadRequestError("Create new product error");
        return newProduct;
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
}

ProductFactory.registerProductType("Electronic", Electronics);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furniture", Furnitures);

module.exports = ProductFactory;
