"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockBatch extends Model {
    static associate(models) {
      StockBatch.belongsTo(models.Stock, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  StockBatch.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      purchasePrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StockBatch",
      tableName: "StockBatches",
    }
  );
  return StockBatch;
};
