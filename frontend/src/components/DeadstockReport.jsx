import React, { useEffect, useState } from "react";
import { fetchDeadstockReport } from "../API/statistics/statisticsAPI";
import { useNavigate } from "react-router-dom";

function DeadstockReport() {
  const [deadstockItems, setDeadstockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchDeadstockReport(months);
        setDeadstockItems(data);
      } catch (error) {
        console.error("Lỗi khi tải báo cáo hàng tồn lâu ngày:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [months]);

  return (
    <div className="bg-card shadow-card rounded-lg p-6 mb-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-textPrimary">Hàng tồn kho lâu ngày (Deadstock)</h2>
          <p className="text-sm text-textSecondary mt-1">Các sản phẩm không có giao dịch xuất hàng trong thời gian qua</p>
        </div>
        <select
          className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
        >
          <option value={1}>1 tháng qua</option>
          <option value={3}>3 tháng qua</option>
          <option value={6}>6 tháng qua</option>
          <option value={12}>1 năm qua</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8 text-textSecondary">Đang tải báo cáo...</div>
      ) : deadstockItems.length === 0 ? (
        <div className="text-center py-8 text-green-600 bg-green-50 rounded-lg">
          Tuyệt vời! Không có sản phẩm nào bị tồn kho quá {months} tháng.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase">Mã SP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase">Tồn kho</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase">Giá trị ước tính</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {deadstockItems.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-red-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.productId || item.id}</td>
                  <td className="px-4 py-3 text-sm text-red-600 font-bold">{item.stock}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {((item.stock || 0) * (Number(item.price) || 0)).toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => navigate('/inventory')}
                      className="text-primary hover:underline text-xs"
                    >
                      Xử lý
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {deadstockItems.length > 5 && (
            <div className="text-center mt-4">
              <button
                onClick={() => navigate('/inventory')}
                className="text-sm text-primary hover:text-accent font-medium underline"
              >
                Xem tất cả {deadstockItems.length} sản phẩm tồn lâu ngày
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeadstockReport;
