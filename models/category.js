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
      allowNull: false
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      validate: {
        allowNull: false,
        isInt: true,
        isNumeric: true
      }
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