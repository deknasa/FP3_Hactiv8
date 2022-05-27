const Category = require("../models/index").Category

const findIdCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findOne({ where: { id: categoryId } })
    .then(result => {
        if (!result) {
            res.status(400).json({
                message: "ID not found"
            });
        } else {
            next();
        };
    });
};


module.exports = {
    findIdCategory,
    
}