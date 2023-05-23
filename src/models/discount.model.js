const { model, Schema, Types } = require("mongoose");

const DOCCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

const apiKeySchema = new Schema(
    {
        discount_name: { type: String, required: true },
        discount_description: { type: String, required: true },
        discount_type: { type: String, default: "fixed_amount" }, // or percentage
        discount_value: { type: Number, required: true },
        discount_max_value: { type: Number, required: true },
        discount_code: { type: String, required: true },
        discount_start_date: { type: Date, required: true },
        discount_end_date: { type: Date, required: true },
        discount_max_uses: { type: Number, required: true },
        discount_uses_count: { type: Number, required: true }, // number discount used
        discount_users_used: { type: Array, default: [] },
        discount_max_uses_per_user: { type: Number, required: true }, // max use per user
        discount_min_order_value: { type: Number, required: true },
        discount_shopId: { type: Types.ObjectId, ref: "Shop" },
        discount_is_active: { type: Boolean, default: true },
        discount_applies_to: { type: String, required: true, enum: ["all", "specific"] },
        discount_product_ids: { type: Array, default: [] } // number product apply
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
);

module.exports = {
    discount: model(DOCCUMENT_NAME, apiKeySchema)
};
