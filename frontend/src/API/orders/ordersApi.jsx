import axiosInstance from "../utils/axiosInstance";

const getAllOrders = async () => {
  const response = await axiosInstance.get(`/orders/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};

const createOrder = async (orderData) => {
  const response = await axiosInstance.post(`/orders/create`, orderData);
  return response.data;
};

const updateOrder = async (orderId, updatedData) => {
  const response = await axiosInstance.put(
    `/orders/update/${orderId}`,
    updatedData
  );
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await axiosInstance.delete(`/orders/delete/${orderId}`);
  return response.data;
};
const findNearestShipper = async (lat, lng) => {
  const response = await axiosInstance.get(`/orders/find-nearest-shipper?lat=${lat}&lng=${lng}`);
  return response.data;
};

export { getAllOrders, createOrder, updateOrder, deleteOrder, findNearestShipper };
