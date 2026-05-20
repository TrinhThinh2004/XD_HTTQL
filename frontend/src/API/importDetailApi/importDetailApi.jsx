import axiosInstance from "../utils/axiosInstance";

export const getAllImportDetails = (params) => {
  return axiosInstance.get(`/import-detail/get-all`, { params });
};

export const getImportDetailById = (id) => {
  return axiosInstance.get(`/import-detail/get/${id}`);
};

export const createImportDetail = (data) => {
  return axiosInstance.post(`/import-detail/create`, data);
};

export const updateImportDetail = (id, data) => {
  return axiosInstance.put(`/import-detail/update/${id}`, data);
};

export const deleteImportDetail = (id) => {
  return axiosInstance.delete(`/import-detail/remove/${id}`);
};
