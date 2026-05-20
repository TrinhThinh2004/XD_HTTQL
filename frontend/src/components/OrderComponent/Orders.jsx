import React, { useRef, useState, useCallback,useEffect } from "react";
import { getAllOrders } from "../../API/orders/ordersApi";
import OrderTable from "./OrderTable";
import OrderStatus from "./OrderStatus";
import OrderWizard from "./OrderWizard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOrderChanged = () => {
    fetchOrders();
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-textPrimary tracking-tight'>
          Quản lý đơn hàng
        </h1>
        <p className="text-textSecondary mt-1">Theo dõi và xử lý các đơn hàng trong hệ thống</p>
      </div>

      {!showWizard && (
        <OrderTable
          orders={orders}
          loading={loading}
          onCreateOrder={() => setShowWizard(true)}
          onOrderChanged={handleOrderChanged}
        />
      )}
      {showWizard && (
        <OrderWizard
          onOrderCreated={() => {
            setShowWizard(false);
            fetchOrders();
          }}
        />
      )}

      <OrderStatus
        orders={orders}
        loading={loading}
        onOrderChanged={handleOrderChanged}
      />
    </div>
  );
}

export default Orders;