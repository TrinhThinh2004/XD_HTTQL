import React, { useState, useEffect, useMemo } from "react";
import OrderDetail from "./OrderDetail";
import { deleteOrder } from "../../API/orders/ordersApi";
import { toast } from "react-toastify";

// Common Components
import Button from '../common/Button';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Badge from '../common/Badge';
import Card from '../common/Card';
import ConfirmModal from '../common/ConfirmModal';

const statusMap = {
  pending: {
    text: "Chờ xác nhận",
    variant: "yellow",
  },
  finding_shipper: {
    text: "Đang tìm shipper",
    variant: "blue",
  },
  shipping: {
    text: "Đang giao",
    variant: "orange",
  },
  delivered: {
    text: "Đã giao",
    variant: "green",
  },
  cancelled: {
    text: "Đã hủy",
    variant: "red",
  },
};

const OrderTable = ({ orders, loading, onCreateOrder, onOrderChanged }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(orders.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [orders, totalPages, currentPage]);

  const paginatedOrders = useMemo(() => {
    const sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [orders, currentPage, itemsPerPage]);

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderToDelete);
      toast.success("Xóa đơn hàng thành công");
      if (onOrderChanged) onOrderChanged();
    } catch (error) {
      toast.error("Xóa đơn hàng thất bại");
    } finally {
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const columns = [
    {
      title: 'Mã đơn',
      key: 'orderNumber',
      render: (val) => <span className="font-bold text-textPrimary">{val}</span>
    },
    {
      title: 'Khách hàng',
      key: 'customerName',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (status) => {
        const info = statusMap[status] || { text: status, variant: 'gray' };
        return <Badge variant={info.variant}>{info.text}</Badge>;
      }
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      render: (val) => <span className="font-semibold text-primary">{val?.toLocaleString()}đ</span>
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      render: (date) => <span className="text-textSecondary text-xs">{new Date(date).toLocaleDateString("vi-VN")}</span>
    },
    {
      title: 'Thao tác',
      key: 'actions',
      className: 'text-right',
      render: (_, order) => (
        <div className="flex justify-end space-x-2">
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 transition-colors"
            onClick={() => setSelectedOrder(order)}
            title="Xem chi tiết"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </Button>
          <Button 
            variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50 transition-colors"
            onClick={() => {
              setOrderToDelete(order.id);
              setIsDeleteModalOpen(true);
            }}
            title="Xóa"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <Card 
        title={`Danh sách đơn hàng (${orders.length})`}
        extra={
          <Button 
            variant="gradient" 
            size="sm" 
            onClick={onCreateOrder}
            leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
          >
            Tạo đơn hàng
          </Button>
        }
      >
        <Table 
          columns={columns} 
          data={paginatedOrders} 
          loading={loading} 
        />
        
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </Card>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteOrder}
        title="Xác nhận xóa đơn hàng"
        message="Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác."
      />

      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};
export default OrderTable;
