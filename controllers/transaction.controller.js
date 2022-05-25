const res = require('express/lib/response')

const Transaction = require('../models/index').TransactionHistory
const Product = require('../models/index').Product
const User = require('../models/index').User
const Category = require('../models/index').Category

exports.postTransaction = async (req, res) => {
    const { product_id, quantity } = req.body
    const user_id = req.id

    await Product.findOne({ where: {id: product_id } })
    .then(product => {
        const total_price = product.price * quantity

        User.findOne({ where: {id: user_id } })
        .then(user => {
            const saldoCukup = user.balance >= total_price
            if (!saldoCukup) {
                res.status(400).json({
                    message: "saldo anda tidak cukup"
                })
            }

            Transaction.create({ product_id, user_id, total_price, quantity, })
            .then(() => {
                const categoryId = product.category_id
                const currentbalance = user.balance - total_price
                const updatedStock = product.stock - quantity

                Product.update({ stock: updatedStock }, { where: { id: product_id } }).then().catch();
                User.update({balance: currentbalance}, { where: { id: user_id } }).then().catch()
                Category.findOne({ where: { id: categoryId } })
                .then((category) => {
                    let sold_product_amount = category.sold_product_amount + quantity
                    Category.update({ sold_product_amount }, { where: { id: categoryId } }).then().catch()
                })
                .catch()


                res.status(201).json({
                    message: "You hace succesfully purchase the product",
                    transactionBil: { total_price, quantity, product_name: product.title }
                })
            })
            .catch(error => { 
                console.log(error)
                res.status(503).json({ 
                    message: "INTERNAL SERVER ERROR", 
                    error 
                }) 
            });
        })
        .catch(e => {
            console.log(e);
            res.status(401).json({
                message: "SERVER ",
                err: e.message
            })
        })
    })
    .catch(e =>{
        console.log(e);
        res.status(503).json({
            message: "ERROR",
            error: e.message
        })
    })   
}

exports.getTransactionsUser = async (req, res) => {
    await Transaction.findAll({
        include: [{
            model: Product,
            as: "Products",
            attributes: ["id", "title", "price", "stock", "category_id"],
        }]
    })
    .then(transaction => {
        return res.status(200).json({
            transactionHistories: transaction
        })
    })
}
