'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
      },
      sold_product_amount: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    // .then(() =>
    //   queryInterface.addConstraint("Categories", {
    //     fields: ["id"],
    //     type: "foreign key",
    //     name: "user_fk",
    //     references: {
    //         table: "Users",
    //         field: "id",
    //     },
    //     onDelete: "cascade",
    //     onUpdate: "cascade",
    //   })
    // )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};