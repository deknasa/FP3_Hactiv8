const User = require('../models/index').User
const bcrypt = require('bcrypt')
const generateToken = require('../middleware/authentication').generateToken

exports.register = async (req, res) => {
    const { full_name, password, gender, email } = req.body

    await User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if (user) {
            return res.status(400).send({
                message: "Email or Username Already Exist"
            })
        }
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
            res.status(403).send({
                message: "FAIL REGISTER",
                error: e.message
            })
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
    const userId = req.params.userId
    const { full_name, email } = req.body
    const dataUser = {
        full_name: full_name,
        email: email
    }

    await User.update(dataUser, {
        where: { id: userId },
        returning: true
    })
    .then((user) => {
        res.status(200).json({
            user: {
                id: user[1][0].id,
                full_name: user[1][0].full_name,
                email: user[1][0].email,
                createdAt: user[1][0].createdAt,
                updatedAt: user[1][0].updatedAt
            }
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            e: e.message
        })
    })
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId

    await User.destroy({ where: { id: userId } })
    .then(() => {
        res.status(200).json({
            message: "Your account has been succesfully deleted",
        });
    })
    .catch(e => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: e.message,
        });
    });
}

exports.topUp = async (req, res) => {
    const balance = req.body.balance
    const id = req.id

    await User.findOne({
        where: { id }
    })
    .then(user => {
        const dataTopup = user.balance + balance
        return User.update( {balance: dataTopup}, {
            where: { id },
            returning: true
        })
        .then(results => {
            return res.status(200).send({
                message: `Your balance has been successfully updated to Rp ${results[1][0].balance}`
            })
        })
        .catch(e => {
            console.log(e);
            res.status(400).send({
                message: "fail to update balance",
                err: e.message
            })
        })
    })
    .catch(e => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: e.message,
        });
    });
}
