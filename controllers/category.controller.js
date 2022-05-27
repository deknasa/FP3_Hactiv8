const Category = require('../models/index').Category
const Product = require('../models/index').Product

exports.postCategory = async (req, res) => {
    const type = req.body.type
    await Category.create({ type })
    .then(category => {
        res.status(201).json({
            category: category
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            e: e
        })
    })
}

exports.getAllCategory = async (req, res) => {
    await Category.findAll({
        include: [{
            model: Product,
            as: "Products",
        }]
    })
    .then(categories => {
        return res.status(200).json({
            categories: categories
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            e: e.message
        })
    })
}

exports.updateCategory = async(req, res) => {
    const categoryId = req.params.categoryId;
    const type = req.body.type;

    await Category.update({ type }, { 
        where: { id: categoryId }, 
        returning: true 
    })
    .then(category => { 
        res.status(200).json({ 
            category: category[1][0]
            // category: category
        }) 
    })
    .catch(error => {
        res.status(503).json({ 
            message: "INTERNAL SERVER ERROR", 
            error 
        });
    });
}

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    await Category.destroy({ where: {id: categoryId} })
    .then(() => {
        res.status(200).json({
            message: "Category has been successfully deleted",
        });
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: e.message,
        });
    });
}
