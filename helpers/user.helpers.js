const User = require('../models/index').User
const Product = require('../models/index').Product

const checkUserBalance = (req, res, next) => {
    const user_id = req.id
    const productId = req.params.productId

    User.findOne({ where: {id: user_id } })
    .then(user => {
        if (!user) {
            res.status(400).send({
                message: `user with id ${user_id} not found`
            })
        }

    
    })
} 

module.exports = {
    checkUserBalance
}
