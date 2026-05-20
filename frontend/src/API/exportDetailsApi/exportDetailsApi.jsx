import axiosInstance from "../utils/axiosInstance";

const fetchExportDetails = (params) => {
  return axiosInstance.get(`/export-detail/get-all`, { params });
};

const createExportDetail = (data) => {
  return axiosInstance.post(`/export-detail/create`, data);
};

const updateExportDetail = (id, data) => {
  return axiosInstance.put(`/export-detail/update/${id}`, data);
};

const deleteExportDetail = (id) => {
  return axiosInstance.delete(`/export-detail/remove/${id}`);
};

export {
  fetchExportDetails,
  createExportDetail,
  updateExportDetail,
  deleteExportDetail,
};
