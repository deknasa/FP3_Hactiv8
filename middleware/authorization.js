const User = require("../models/index").User;
const Category = require("../models/index").Category
const Product = require("../models/index").Product

const userAuthorization = async(req, res, next) => {
    const id = req.params.userId;
    const user_id = req.id;

    await User.findOne({ where: { id } })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user.id === user_id) {
                next();
            } else {
                res.status(402).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
                });
            }
        })
        .catch((e) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                e: e.message
            });
        });
};

const adminAuthorization = (req, res, next) => {
    const role = req.role;
    if (role != "admin") {
        return res.status(400).json({
            message: "only admin can acces categories",
        });
    } else {
        next();
    };
};

const findIdCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findOne({ where: { id: categoryId } })
    .then(result => {
        if (!result) {
            res.status(400).json({
                message: "ID not found"
            });
        } else {
            next();
        };
    });
};

const findIdProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findOne({ where: { id: productId } })
    .then(result => {
        if (!result) {
            res.status(400).json({
                message: `Product with id ${productId} not found`
            });
        }
        else{
            next();
        };
    });
};


module.exports = {
    userAuthorization,
    adminAuthorization,
    findIdCategory,
    findIdProduct
};