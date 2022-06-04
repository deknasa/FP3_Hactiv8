const Category = require("../models/index").Category
const Product = require('../models/index').Product

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

const checkProductBeforeDelete = (req, res, next) => {
    const categoryId = req.params.categoryId
    Product.findOne({ where: {category_id: categoryId } })
    .then(product => {
        console.log(product);
        console.log(categoryId);
        if (product) {
            res.status(400).json({
                message: "You can't delete a category that contains a product. please delete the product first"
            })
        }
        else{
            next()
        }
    })
    .catch(e => {
        res.status(503).json({
            error: e.message
        })
    })
}

module.exports = {
    findIdCategory,
    checkProductBeforeDelete
}
