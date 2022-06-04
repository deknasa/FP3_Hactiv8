const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
const authorization = require('../middleware/authorization').adminAuthorization
const { findIdCategory, checkProductBeforeDelete } = require('../helpers/category.helpers')
const categoryController = require('../controllers/category.controller')

router.post('/', authentication, authorization, categoryController.postCategory)
router.get('/', authentication, authorization, categoryController.getAllCategory)
router.patch(
    '/:categoryId', 
    authentication, 
    authorization, 
    findIdCategory, 
    categoryController.updateCategory
)
router.delete(
    '/:categoryId', 
    authentication, 
    authorization, 
    findIdCategory, 
    checkProductBeforeDelete,
    categoryController.deleteCategory
)


module.exports = router