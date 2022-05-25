const Product = require('../models/index').Product
const Category = require('../models/index').Category

exports.postProduct = async (req, res) => {
    const { title, price, stock, category_id } = req.body

    await Category.findOne({ where: { id: category_id } })
    .then(category => {
        if (!category) {
            return res.status(400).json({
                message: `no category data with category id ${category_id}`
            })
        }
        Product.create({ title, price, stock, category_id })
        .then(product => {
            res.status(201).send({
                product: {
                    id: product.id,
                    title: product.title,
                    price: `Rp. ${product.price}`,
                    stock: product.stock,
                    category_id: product.category_id,
                    updatedAt: product.updatedAt,
                    createdAt: product.createdAt
                }
            })
        })
        .catch(e => {
            console.log(e);
            res.status(403).send({
                message: "FAILED TO POST PRODUCT",
                error: e.message
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: err.message
        })
    })
}

exports.getAllProduct = async (req, res) => {
    await Product.findAll()
    .then(products => {
        return res.status(200).send({
            products: 
            products
            // {
            //     id: products.id,
            //     title: products.title,
            //     price: `Rp. ${products.price}`,
            //     stock: products.stock,
            //     category_id: products.category_id,
            //     createdAt: products.createdAt,
            //     updatedAt: products.updatedAt
            // }
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })
}

exports.updateProduct = async (req, res) => {
    const productId = req.params.productId
    const { price, stock, title } = req.body

    await Product.update({ price, stock, title }, {
        where: { id: productId },
        returning: true
    })
    .then(product => {
        res.status(200).send({
            product: 
            // product[1]
            {
                id: product[1][0].id,
                title: product[1][0].title,
                price: `Rp. ${product[1][0].price}`,
                stock: product[1][0].stock,
                category_id: product[1][0].category_id,
                createdAt: product[1][0].createdAt,
                updatedAt: product[1][0].updatedAt
            }
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })
}

exports.updateCategoryId = async (req, res) => {
    const productId = req.params.productId
    const category_id = req.body.category_id

    await Category.findOne({ where: { id: category_id } })
    .then(results => {
        if (!results) {
            return res.status(400).json({
                message: `no category data with category id ${category_id}`
            })
        }
        Product.update({ category_id }, {
            where: { id: productId },
            returning: true
        })
        .then(product => {
            return res.status(200).send({
                product: 
                // product
                {
                    id: product[1][0].id,
                    title: product[1][0].title,
                    price: `Rp. ${product[1][0].price}`,
                    stock: product[1][0].stock,
                    category_id: product[1][0].category_id,
                    createdAt: product[1][0].createdAt,
                    updatedAt: product[1][0].updatedAt
                }
            })
        })
        .catch(e => {
            console.log(e);
            res.status(403).json({
                message: "Fail",
                error: e.message
            })
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })    
}

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId

    await Product.destroy({ where: {id: productId } })
    .then(() => {
        res.status(200).json({
            message: "Product has been succesfully deleted",
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
