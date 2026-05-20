import React, { useState, useEffect, useCallback } from "react";
import ShipperMap from "./ShipperMap";
import ShipperList from "./ShipperList";
import AddShipperForm from "./AddShipperForm";
import EditShipperForm from "./EditShipperForm";
import {
  getAllShippers,
  addNewShipper,
  deleteShipper,
  updateShipper,
  updateShipperStatus,
} from "../../API/shipper/shipperApi";
import { getAllOrders } from "../../API/orders/ordersApi";
import { toast } from "react-toastify";
import ConfirmModal from "../common/ConfirmModal";

function Shippers() {
  const [shippers, setShippers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [focusInfo, setFocusInfo] = useState({ id: null, timestamp: 0 });
  const [loading, setLoading] = useState(true);
  const [editingShipper, setEditingShipper] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [shipperToDelete, setShipperToDelete] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [shippersData, ordersData] = await Promise.all([
        getAllShippers(),
        getAllOrders(),
      ]);
      setShippers(shippersData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Không thể tải dữ liệu:", err);
      toast.error("Không thể tải dữ liệu shipper và đơn hàng");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const handleAdd = async (newData) => {
    try {
      await addNewShipper(newData);
      toast.success("Thêm shipper thành công!");
      setShowAdd(false);
      await fetchData();
    } catch (err) {
      toast.error("Thêm shipper thất bại", err);
    }
  };

  const handleDeleteShipper = async () => {
    try {
      await deleteShipper(shipperToDelete);
      toast.success("Xóa shipper thành công!");
      await fetchData();
    } catch (err) {
      toast.error("Xóa shipper thất bại", err);
    } finally {
      setIsDeleteModalOpen(false);
      setShipperToDelete(null);
    }
  };

  const handleEdit = async (formData) => {
    try {
      await updateShipper(formData.id, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        status: formData.status,
      });
      toast.success("Cập nhật shipper thành công!");
      setEditingShipper(null);
      await fetchData();
    } catch (err) {
      toast.error("Cập nhật shipper thất bại", err);
    }
  };

  const handleUpdateStatus = async (shipperId, newStatus) => {
    try {
      await updateShipperStatus(shipperId, { status: newStatus });
      toast.success("Cập nhật trạng thái thành công!");
      await fetchData();
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại", err);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-textPrimary tracking-tight'>
          Quản lý shipper
        </h1>
        <p className="text-textSecondary mt-1">Quản lý đội ngũ giao hàng và theo dõi vị trí trực tuyến</p>
      </div>

      <ShipperMap shippers={shippers} focusId={focusInfo} />

      <ShipperList
        shippers={shippers}
        orders={orders}
        onAddShipper={() => setShowAdd(true)}
        onDeleteShipper={(id) => {
          setShipperToDelete(id);
          setIsDeleteModalOpen(true);
        }}
        onFocusShipper={(id) => setFocusInfo({ id, timestamp: Date.now() })}
        onEditShipper={(shipper) => setEditingShipper(shipper)}
        onUpdateStatus={handleUpdateStatus}
        loading={loading}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteShipper}
        title="Xác nhận xóa shipper"
        message="Bạn có chắc chắn muốn xóa shipper này? Hành động này không thể hoàn tác."
      />

      {showAdd && (
        <AddShipperForm
          shipper={editingShipper}
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editingShipper && (
        <EditShipperForm
          shipper={editingShipper}
          onSubmit={handleEdit}
          onClose={() => setEditingShipper(null)}
        />
      )}
    </div>
  );
}

export default Shippers;
