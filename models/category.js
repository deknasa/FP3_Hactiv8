'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
   
    static associate(models) {
      // this.belongsTo(models.User, {
      //   as: "users",
      //   foreignKey: "id",
      // });
      this.hasMany(models.Product, {
        as: "Products",
        foreignKey: "category_id",
      });
    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "type is required",
        },
    },
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
            args: true,
            msg: "sold_product_amount is required",
        },
        isInt: {
            args: true,
            msg: "sold_product_amount must be integer",
        },
    },
    }
  }, {
    sequelize,
    modelName: 'Category',
    hooks: {
      beforeCreate: (category, opt) => {
          const sold_product_amount = 0;
          category.sold_product_amount = sold_product_amount
      }
    }
  });
  return Category;
};