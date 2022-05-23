const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
const { adminAuthorization, findIdProduct } = require('../middleware/authorization')
const productController = require('../controllers/product.controller')

router.post('/', authentication, adminAuthorization, productController.postProduct)
router.get('/', authentication, adminAuthorization, productController.getAllProduct)
router.put(
    '/:productId', 
    authentication, 
    adminAuthorization, 
    findIdProduct,
    productController.updateProduct)
router.patch(
    '/:productId', 
    authentication, 
    adminAuthorization, 
    findIdProduct,
    productController.updateCategoryId)
router.delete(
    '/:productId', 
    authentication, 
    adminAuthorization, 
    findIdProduct,
    productController.deleteProduct)

module.exports = router