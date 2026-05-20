import axiosInstance from "../utils/axiosInstance";

const getAllImportReceipts = async (params) => {
  const response = await axiosInstance.get(`/import-receipt/get-all`, { params });
  return response.data;
};

const getImportReceiptById = async (id) => {
  const response = await axiosInstance.get(
    `/import-receipt/get-by/${id}`
  );
  return response.data;
};

const createImportReceipt = async (data) => {
  const response = await axiosInstance.post(
    `/import-receipt/create`,
    data
  );
  return response.data;
};

const updateImportReceipt = async (id, data) => {
  const response = await axiosInstance.put(
    `/import-receipt/update/${id}`,
    data
  );
  return response.data;
};

const deleteImportReceipt = async (id) => {
  const response = await axiosInstance.delete(
    `/import-receipt/remove/${id}`
  );
  return response.data;
};

export {
  getAllImportReceipts,
  getImportReceiptById,
  createImportReceipt,
  updateImportReceipt,
  deleteImportReceipt,
};
