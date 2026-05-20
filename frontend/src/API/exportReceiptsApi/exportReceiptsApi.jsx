import axiosInstance from "../utils/axiosInstance";

export const fetchExportReceipts = (params) => {
  return axiosInstance.get(`/export-receipt/get-all`, { params });
};
const fetchExportReceiptById = (id) => {
  return axiosInstance.get(`/export-receipt/get/${id}`);
};

const createExportReceipt = (data) => {
  return axiosInstance.post(`/export-receipt/create`, data);
};

const updateExportReceipt = (id, data) => {
  return axiosInstance.put(`/export-receipt/update/${id}`, data);
};

const deleteExportReceipt = (id) => {
  return axiosInstance.delete(`/export-receipt/remove/${id}`);
};

export {
  fetchExportReceiptById,
  createExportReceipt,
  updateExportReceipt,
  deleteExportReceipt,
};
