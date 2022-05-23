const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
const { adminAuthorization, findIdCategory} = require('../middleware/authorization')
const categoryController = require('../controllers/category.controller')

router.post('/', authentication, adminAuthorization, categoryController.postCategory)
router.get('/', authentication, adminAuthorization, categoryController.getAllCategory)
router.patch(
    '/:categoryId', 
    authentication, 
    adminAuthorization, 
    findIdCategory, 
    categoryController.updateCategory
)
router.delete(
    '/:categoryId', 
    authentication, 
    adminAuthorization, 
    findIdCategory, 
    categoryController.deleteCategory
)


module.exports = router