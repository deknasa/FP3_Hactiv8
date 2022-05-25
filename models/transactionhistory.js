'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {
        as: "Products",
        foreignKey: "product_id",
      });
      this.belongsTo(models.User, {
          as: "Users",
          foreignKey: "user_id",
      });
    }
  }
  TransactionHistory.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "stock is required"
        },
        isInt: {
          args: true,
          msg: "price must be integer"
        },
        isNumeric: true
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "stock is required"
        },
        isInt: {
          args: true,
          msg: "price must be integer"
        },
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};