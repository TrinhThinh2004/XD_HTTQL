const db = require("../models");

const getAllExportDetails = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;
  const where = {};

  if (search) {
    const { Op } = require("sequelize");
    where["$StockProductData.name$"] = { [Op.like]: `%${search}%` };
  }

  const { count, rows } = await db.ExportDetails.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      { model: db.ExportReceipts, as: "exportReceiptData" },
      { model: db.Stock, as: "StockProductData" },
    ],
    order: [["id", "DESC"]],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    details: rows,
  };
};

const getExportDetailById = async (id) => {
  const detail = await db.ExportDetails.findByPk(id, {
    include: [
      { model: db.ExportReceipts, as: "exportReceiptData" },
      { model: db.Stock, as: "StockProductData" },
    ],
  });
  if (!detail) throw new Error("Export detail not found");
  return detail;
};

const createExportDetail = async (data) => {
  return await db.ExportDetails.create(data);
};

const updateExportDetail = async (id, data) => {
  const detail = await db.ExportDetails.findByPk(id);
  if (!detail) throw new Error("Export detail not found");
  await detail.update(data);
  return detail;
};

const deleteExportDetail = async (id) => {
  const detail = await db.ExportDetails.findByPk(id);
  if (!detail) throw new Error("Export detail not found");
  await detail.destroy();
  return true;
};

module.exports = {
  getAllExportDetails,
  getExportDetailById,
  createExportDetail,
  updateExportDetail,
  deleteExportDetail,
};
