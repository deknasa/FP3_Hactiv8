const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
// const authorization = require('../middleware/authorization').userAuthorization
const { findDataProduct, checkProductStock } = require('../helpers/product.helpers')
const transactionController = require('../controllers/transaction.controller')

router.post(
    '/', 
    authentication, 
    // authorization, 
    findDataProduct,
    checkProductStock,
    transactionController.postTransaction
)
router.get(
    '/user',
    authentication,
    // authorization,
    transactionController.getTransactionsUser
)


module.exports = router