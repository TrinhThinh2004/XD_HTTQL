"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StockBatches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Stocks", // Linking to Stocks table since it's the primary product table
        //   key: "id",
        // },
        onDelete: "CASCADE",
      },
      batchNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      purchasePrice: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("StockBatches");
  },
};
