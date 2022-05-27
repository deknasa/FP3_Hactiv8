const express = require('express')
const app = require('..')
const router = express.Router()
const authentication = require('../middleware/authentication').verify   
const authorization = require('../middleware/authorization').userAuthorization
const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/:userId', authentication, authorization, userController.updateUser)
router.delete('/:userId', authentication, authorization, userController.deleteUser)
router.patch('/topup', authentication, userController.topUp)
router.get('/', userController.usergetall)


module.exports = router