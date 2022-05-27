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
                user.balance = user.balance - total_price
                product.stock = product.stock - quantity
                product.save()
                user.save()
                Category.findOne({ where: { id: categoryId } })
                .then((category) => {
                    category.sold_product_amount = category.sold_product_amount + quantity
                    category.save()
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
            res.status(503).json({
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

exports.getTransactionsByUser = async (req, res) => {
    await Transaction.findAll({
        include: [{
            model: Product,
            as: "Product",
            attributes: ["id", "title", "price", "stock", "category_id"],
        }]
    })
    .then(transaction => {
        // console.log(transaction[1]);
        return res.status(200).json({
            transactionHistories: 
            transaction
            // {
            //     product_id: transaction[1].product_id,
            //     user_id: transaction.user_id,
            //     quantity: transaction.quantity,
            //     total_price: transaction.total_price,
            //     createdAt: transaction.createdAt,
            //     updatedAt: transaction.updatedAt
            // }
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e
        })
    })
}

exports.getTransactionsByAdmin = async(req, res) => {
    await Transaction.findAll({
        include: [{
            model: Product,
            as: "Product",
            attributes: ["id", "title", "price", "stock", "category_id"]
        },{
            model: User,
            as: "User",
            attributes: ["id", "email", "balance", "gender", "role"]
        }]
    })
    .then(transactions => {
        return res.status(200).json({
            transactionHistories: transactions
        })
    })
    .catch(e => { 
        res.status(503).json({
            message: "INTERNAL SERVER ERROR", 
            error: e.message
        }) 
    })
}

exports.getTransactionIdByAdmin = async(req, res) => {
    const transactionId = req.params.transactionId

    await Transaction.findOne({ where: {id: transactionId },
        include: [{
            model: Product,
            as: "Product",
            attributes: ["id", "title", "price", "stock", "category_id"],
        }]
    })
    .then(transaction => {
        return res.status(200).json({ 
            transaction
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e
        })
    })
}
