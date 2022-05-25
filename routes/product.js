const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
const authorization = require('../middleware/authorization').adminAuthorization
const { findIdProduct } = require('../helpers/product.helpers')
const productController = require('../controllers/product.controller')

router.post('/', authentication, authorization, productController.postProduct)
router.get('/', authentication, productController.getAllProduct)
router.put(
    '/:productId', 
    authentication, 
    authorization, 
    findIdProduct,
    productController.updateProduct)
router.patch(
    '/:productId', 
    authentication, 
    authorization, 
    findIdProduct,
    productController.updateCategoryId)
router.delete(
    '/:productId', 
    authentication, 
    authorization, 
    findIdProduct,
    productController.deleteProduct)

module.exports = router