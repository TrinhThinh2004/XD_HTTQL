const db = require("../models");

const getAllImportReceipts = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;
  const where = {};

  if (search) {
    const { Op } = require("sequelize");
    where[Op.or] = [
      { note: { [Op.like]: `%${search}%` } },
      // Thêm search theo supplier name hoặc user email nếu cần, 
      // nhưng Sequelize require include association for that.
    ];
  }

  const { count, rows } = await db.ImportReceipts.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      { model: db.User, as: "userData" },
      { model: db.Suppliers, as: "supplierData" },
      {
        model: db.ImportDetails,
        as: "importDetailData",
        include: [{ model: db.Stock, as: "StockProductData" }],
      },
    ],
    distinct: true, // Tránh đếm sai khi include 1-n
    order: [["import_date", "DESC"], ["id", "DESC"]],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    receipts: rows,
  };
};

const getImportReceiptById = async (id) => {
  const receipt = await db.ImportReceipts.findByPk(id, {
    include: [
      { model: db.Suppliers, as: "supplierData" },
      { model: db.User, as: "userData" },
      {
        model: db.ImportDetails,
        as: "importDetailData",
        include: [{ model: db.Stock, as: "StockProductData" }],
      },
    ],
  });
  if (!receipt) throw new Error(`Import receipt with ID ${id} not found`);
  return receipt;
};

const createImportReceipt = async (data) => {
  const { details, ...receiptData } = data;
  const t = await db.sequelize.transaction();
  try {
    const receipt = await db.ImportReceipts.create(receiptData, { transaction: t });

    if (details?.length) {
      const detailData = details.map((item) => ({
        importId: receipt.id,
        ...item,
      }));
      await db.ImportDetails.bulkCreate(detailData, { transaction: t });

      // Tăng stock cho từng sản phẩm
      for (const item of details) {
        const stock = await db.Stock.findByPk(item.productId, { transaction: t });
        if (stock) {
          await stock.increment("stock", { by: Number(item.quantity), transaction: t });
        }
      }
    }

    await t.commit();
    return await getImportReceiptById(receipt.id);
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const updateImportReceipt = async (id, data) => {
  const { details, ...receiptData } = data;
  const t = await db.sequelize.transaction();
  try {
    await db.ImportReceipts.update(receiptData, {
      where: { id },
      transaction: t,
    });

    if (details) {
      await db.ImportDetails.destroy({
        where: { importId: id },
        transaction: t,
      });
      const newDetails = details.map((item) => ({ importId: id, ...item }));
      await db.ImportDetails.bulkCreate(newDetails, { transaction: t });
    }

    await t.commit();
    return await getImportReceiptById(id);
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const deleteImportReceipt = async (id) => {
  const t = await db.sequelize.transaction();
  try {
    await db.ImportReceipts.destroy({ where: { id }, transaction: t });
    await t.commit();
    return { message: "Deleted successfully" };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  getAllImportReceipts,
  getImportReceiptById,
  createImportReceipt,
  updateImportReceipt,
  deleteImportReceipt,
};
