"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Stocks", "minStock", {
      type: Sequelize.INTEGER,
      defaultValue: 10,
      allowNull: false,
    });
    await queryInterface.addColumn("Products", "minStock", {
      type: Sequelize.INTEGER,
      defaultValue: 10,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Stocks", "minStock");
    await queryInterface.removeColumn("Products", "minStock");
  },
};
