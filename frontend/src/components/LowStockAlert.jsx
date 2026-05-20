import React, { useEffect, useState } from "react";
import { getLowStock } from "../API/inventory/inventoryAPI";
import { useNavigate } from "react-router-dom";

function LowStockAlert() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getLowStock();
        setLowStockItems(data);
      } catch (error) {
        console.error("Error fetching low stock items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return null;
  if (lowStockItems.length === 0) return null;

  return (
    <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-lg font-bold text-red-700">Cảnh báo tồn kho thấp!</h2>
        </div>
        <button 
          onClick={() => navigate('/inventory')}
          className="text-sm font-medium text-red-700 hover:text-red-800 underline"
        >
          Xem chi tiết
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lowStockItems.slice(0, 6).map((item) => (
          <div key={item.id} className="bg-white p-3 rounded shadow-sm border border-red-100 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">Mã: {item.productId || item.id}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-600">{item.stock}</p>
              <p className="text-xs text-gray-400">Tối thiểu: {item.minStock}</p>
            </div>
          </div>
        ))}
      </div>
      {lowStockItems.length > 6 && (
        <p className="text-xs text-red-500 mt-2 italic">* Và {lowStockItems.length - 6} sản phẩm khác...</p>
      )}
    </div>
  );
}

export default LowStockAlert;
