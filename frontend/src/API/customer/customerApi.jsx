import axiosInstance from "../utils/axiosInstance";

const fetchAllCustomers = async (
  page = 1,
  limit = 1000,
  search = "",
) => {
  return axiosInstance.get(`/customer/get-all-customers`, {
    params: { page, limit, search, },
  });
};
const createCustomer = async (data) => {
  return axiosInstance.post(`/customer/create-customer`, data);
};

const updateCustomer = async (data) => {
  return axiosInstance.put(`/customer/update-customer`, data);
};

const deleteCustomer = async (id) => {
  return await axiosInstance.delete(
    `/customer/delete-customer?id=${id}`
  );
};
const deleteManyCustomer = async (ids) => {
  if (!ids || !ids.length) throw new Error("Missing ids");
  return await axiosInstance.post(`/customer/delete-many-customers`, {
    ids,
  });
};

export {
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  deleteManyCustomer,
};
