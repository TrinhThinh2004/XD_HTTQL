import axiosInstance from "../utils/axiosInstance";

const getAllShippers = async () => {
  const response = await axiosInstance.get(`/shipper/get-all`);
  return Array.isArray(response.data) ? response.data : [];
};
const addNewShipper = async (shipperData) => {
  const response = await axiosInstance.post(
    `/shipper/create-new-shipper`,
    shipperData
  );
  return response.data;
};
const deleteShipper = async (shipperId) => {
  const response = await axiosInstance.delete(`/shipper/delete-shipper/${shipperId}`);
  return response.data;
};
const updateShipper = async (shipperId, shipperData) => {
  const response = await axiosInstance.put(
    `/shipper/update-shipper/${shipperId}`,
    shipperData
  );
  return response.data;
};

const updateShipperStatus = async (shipperId, { status, currentOrderId, address, lat, lng }) => {
  const response = await axiosInstance.put(`/shipper/update-status/${shipperId}`, {
    status,
    currentOrderId,
    address,
    lat,
    lng,
  });
  return response.data;
};
export { getAllShippers, addNewShipper, deleteShipper, updateShipper, updateShipperStatus };
