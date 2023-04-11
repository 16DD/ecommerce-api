const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
    {
        product_name: { type: String, required: true },
        product_thumb: { type: String, required: true },
        product_description: { type: String },
        product_price: { type: Number, required: true },
        product_slug: { type: String },
        product_quantity: { type: Number, required: true },
        product_type: { type: String, required: true, enum: ["Electronic", "Clothing", "Furniture"] },
        product_shop: { type: Schema.Types.ObjectId, required: true, ref: "Shop" },
        product_attributes: { type: Schema.Types.Mixed, required: true },
        product_ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1.0"],
            max: [5, "Rating must be below 5.0"],
            set: (val) => Math.round(val * 10) / 10
        },
        product_variations: { type: Array, default: [] },
        isDraft: { type: Boolean, default: true, index: true, select: false },
        isPublished: { type: Boolean, default: false, index: true, select: false }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
);

// Document middleware : create slug when save
productSchema.pre("save", function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});

const clothingSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: String,
        material: String,
        product_shop: { type: Schema.Types.ObjectId, ref: "Shop" }
    },
    {
        collection: "Clothes",
        timestamps: true
    }
);
const electronicSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: String,
        material: String,
        product_shop: { type: Schema.Types.ObjectId, ref: "Shop" }
    },
    {
        collection: "Electronics",
        timestamps: true
    }
);

const furnitureSchema = new Schema(
    {
        brand: { type: String, required: true },
        size: String,
        material: String,
        product_shop: { type: Schema.Types.ObjectId, ref: "Shop" }
    },
    {
        collection: "Furnitures",
        timestamps: true
    }
);

module.exports = {
    productModel: model(DOCUMENT_NAME, productSchema),
    clothesModel: model("Clothe", clothingSchema),
    furnitureModel: model("Furniture", furnitureSchema),
    electronicModel: model("Electronic", electronicSchema)
};
