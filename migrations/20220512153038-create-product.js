'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        validate: {
          allowNull: false,
          isInt: true,
          isNumeric: true,
          min: 0,
          max: 50000000,
          customValidator(value) {
            if (value < 0) {
              throw new Error("price can't be less than 0")
            }
            if (value > 50000000) {
              throw new Error("price can't be more than 50000000")
            }
          }
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        validate: {
          allowNull: false,
          isInt: true,
          isNumeric: true,
          min: 5,
          customValidator(min) {
            if (min < 5) {
              throw new Error("stock can't be less than 5")
            }
          }
        }
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};