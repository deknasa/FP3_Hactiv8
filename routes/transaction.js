const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
const { adminAuthorization, customerAuthorization } = require('../middleware/authorization')
const { findDataProduct, checkProductStock } = require('../helpers/product.helpers')
const transactionController = require('../controllers/transaction.controller')

router.post(
    '/', 
    authentication, 
    customerAuthorization,
    findDataProduct,
    checkProductStock,
    transactionController.postTransaction
)
router.get(
    '/user',
    authentication,
    customerAuthorization,
    transactionController.getTransactionsByUser
)
router.get(
    '/admin',
    authentication,
    adminAuthorization,
    transactionController.getTransactionsByAdmin
)
router.get(
    '/:transactionId',
    authentication,
    adminAuthorization,
    transactionController.getTransactionIdByAdmin
)

module.exports = router