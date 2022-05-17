'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        // validate: {
        //   isEmail: true,
        //   allowNull: false,
        //   unique: true,
        // },
      },
      password: {
        type: Sequelize.STRING,
        // validate: {
        //   allowNull: false,
        //   len: [6, 10],
        //   customValidator(len) {
        //     if (!(len === [6, 10])) {
        //       throw new Error("password must consist of 6 - 10 characters")
        //     }
        //   }
        // }
      },
      gender: {
        type: Sequelize.STRING,
        // validate: {
        //   allowNull: false,
        //   isIn: [['male', 'female']],
        // }
      },
      role: {
        type: Sequelize.STRING,
        // validate: {
        //   allowNull: false,
        //   isIn: [['admin', 'customer']],
        // }
      },
      balance: {
        type: Sequelize.INTEGER,
        // validate: {
        //   allowNull: false,
        //   isInt: true,
        //   isNumeric: true,
        //   min: 0,
        //   max: 100000000,
        //   customValidator(value) {
        //     if (value < 0) {
        //       throw new Error("balance can't be 0, must be more than 0")
        //     }
        //     if (value > 100000000) {
        //       throw new Error("balance can't be more than 100000000")
        //     }
        //   }
        // }
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
    await queryInterface.dropTable('Users');
  }
};