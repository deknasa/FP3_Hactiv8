const User = require('../models/index').User
const bcrypt = require('bcrypt')
const generateToken = require('../middleware/authentication').generateToken

exports.register = async (req, res) => {
    const { full_name, password, gender, email } = req.body

    return User.create({
        full_name,
        email,  
        password,
        gender,
        role: "customer",
    })
    .then(user => {
        res.status(201).send({
            data: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                gender: user.gender,
                balance: `Rp. ${user.balance}`,
                createdAt: user.createdAt
            }
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    await User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(400).send({
                message: "email is not registered, please register"
            })
        }
        const passwordValid = bcrypt.compareSync(password, user.password)
        if (!passwordValid) {
            return res.status(401).send({
                message: "password not match"
            })
        }
        const data = {
            id: user.id,
            email: user.email,
            role: user.role,
            gender: user.gender
        }
        const token = generateToken(data)
        res.status(200).send({
            token: token
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })
}

exports.updateUser = async (req, res) => {
    
}
