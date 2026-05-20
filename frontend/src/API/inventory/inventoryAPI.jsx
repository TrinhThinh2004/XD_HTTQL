import axiosInstance from "../utils/axiosInstance";

const getAllInventory = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/inventory`, {
    params: { page, limit }
  });
  return response.data;
};

const createInventoryLog = async (logData) => {
  const response = await axiosInstance.post(
    `/inventory/create`,
    logData
  );
  return response.data;
};

const editInventoryLog = async (id, logData) => {
  const response = await axiosInstance.put(
    `/inventory/edit/${id}`,
    logData
  );
  return response.data;
};

const deleteInventoryLog = async (id) => {
  const response = await axiosInstance.delete(
    `/inventory/delete/${id}`
  );
  return response.data;
};

const getLowStock = async () => {
  const response = await axiosInstance.get(`/inventory/low-stock`);
  return response.data;
};

const getInventoryLogs = async (params = {}) => {
  const response = await axiosInstance.get(`/inventory/logs`, { params });
  return response.data;
};

export {
  getAllInventory,
  createInventoryLog,
  editInventoryLog,
  deleteInventoryLog,
  getLowStock,
  getInventoryLogs
};
