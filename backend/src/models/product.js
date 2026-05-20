"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ImportDetails, {
        foreignKey: "productId",
        as: "importDetailData",
      });
      Product.hasMany(models.ExportDetails, {
        foreignKey: "productId",
        as: "exportDetailData",
      });
      Product.hasMany(models.Stock, {
        foreignKey: "productId",
        as: "stocks",
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING, 
    price: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    unit: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.TEXT,
    warehouseAddress: DataTypes.STRING,
    warehouseLat: DataTypes.FLOAT,
    warehouseLng: DataTypes.FLOAT,
    minStock: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    deleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "Product",
  });
  return Product;
};