'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    
    static associate(models) {
      // define association here
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