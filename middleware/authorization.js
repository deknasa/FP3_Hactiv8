const User = require("../models/index").User

const userAuthorization = async(req, res, next) => {
    const user_id = req.id;
    const id = req.params.userId;
    await User.findOne({ where: { id } })
    .then((user) => {
        if (!user) {
            res.status(400).json({ 
                message: "id not found" 
            });
        } else if (user.id === user_id) {
            next();
        } else {
            res.status(401).json({
                name: "authorization error",
                devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
            });
        };
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ 
            message: "INTERNAL SERVER ERROR", 
            error 
        });
    });
};

const adminAuthorization = (req, res, next) => {
    const role = req.role;
    
    if (role != "admin") {
        return res.status(401).json({ message: "only admin can access this menu !" });
    } 
    else {
        next()
    };
};

const customerAuthorization = (req, res, next) => {
    const role = req.role;
    if (role != "customer") {
        return res.status(401).json({ message: "only customers can buy the product !" });
    }
    else {
        next()
    }
}

module.exports = {
    userAuthorization,
    adminAuthorization,
    customerAuthorization,
};