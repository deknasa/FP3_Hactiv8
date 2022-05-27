const Product = require("../models/index").Product

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

const findDataProduct = (req, res, next) => {
    const product_id = req.body.product_id;
    Product.findOne({ where: { id: product_id } })
    .then(result => {
        if (!result) {
            res.status(400).json({
                message: `Product with id ${product_id} not found`
            });
        }
        else{
            next();
        };
    });
};

const checkProductStock = (req, res, next) => {
    const quantity = req.body.quantity
    const product_id = req.body.product_id
    Product.findOne({ where: {id: product_id } })
    .then(product => {
        const isBigger = quantity > product.stock
        if (isBigger) {
            res.status(400).json({
                message: `product quantity can't exceed stock! Product stock available is ${product.stock}`
            })
        }
        else{
            next()
        }
    })
}

module.exports = {
    findIdProduct,
    checkProductStock,
    findDataProduct
}
