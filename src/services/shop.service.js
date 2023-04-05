const shopModel = require("../models/shop.model");
const { RoleShop } = require("../constants/shop.constant");
class ShopService {
    static create = async ({ name, email, password, roles = [RoleShop.SHOP] }) => {
        return await shopModel.create({
            name,
            email,
            password,
            roles
        });
    };
    static findByEmail = async ({ email, select = { email: 1, password: 1, name: 1, roles: 1 } }) => {
        return await shopModel.findOne({ email }).select(select).lean();
    };
    w;
}

module.exports = ShopService;
