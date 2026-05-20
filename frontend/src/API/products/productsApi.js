import axiosInstance from "../utils/axiosInstance";

const getAllProducts = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/products`, {
    params: {
      page,
      limit
    }
  });
  return response.data;
};

const createProduct = async (productData) => {
  const response = await axiosInstance.post(`/products/create`, productData);
  return response.data;
};

const editProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/products/edit/${id}`, productData);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/delete/${id}`);
  return response.data;
};

export {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct
};