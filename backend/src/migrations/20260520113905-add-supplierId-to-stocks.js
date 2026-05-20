"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Stocks", "supplierId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      // references: {
      //   model: "Suppliers",
      //   key: "id",
      // },
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Stocks", "supplierId");
  },
};
