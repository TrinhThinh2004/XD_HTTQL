import React from "react";
import Table from "../common/Table";
import Button from "../common/Button";

export default function ReceiptTable({
  receipts,
  handleEdit,
  handleDelete,
  CURRENCY_UNIT,
  loading,
}) {
  const columns = [
    {
      title: 'Ngày nhập',
      key: 'import_date',
      render: (date) => <span className="text-textSecondary">{new Date(date).toLocaleDateString("vi-VN")}</span>
    },
    {
      title: 'Người nhập',
      key: 'userData',
      render: (user, row) => (
        <span className="font-medium text-textPrimary">
          {user ? `${user.firstName} ${user.lastName}`.trim() || user.email : `ID ${row.userId}`}
        </span>
      )
    },
    {
      title: 'Nhà cung cấp',
      key: 'supplierData',
      render: (sup, row) => sup?.name || `ID ${row.supplierId}`
    },
    {
      title: 'Ghi chú',
      key: 'note',
      render: (val) => <span className="text-xs italic text-textSecondary">{val || "-"}</span>
    },
    {
      title: 'Sản phẩm',
      key: 'importDetailData',
      render: (details) => (
        <div className="max-h-32 overflow-y-auto space-y-1">
          {details?.map((d, i) => (
            <div key={i} className="text-[10px] bg-gray-50 p-1 rounded border border-gray-100">
              <span className="font-bold text-primary">{d.StockProductData?.name}</span>
              <span className="ml-1 text-textSecondary">x{d.quantity} {d.StockProductData?.unit}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Tổng giá',
      key: 'total',
      render: (_, row) => {
        const total = row.importDetailData?.reduce((sum, d) => sum + d.quantity * d.price, 0) || 0;
        return <span className="font-bold text-primary">{total.toLocaleString("vi-VN")} {CURRENCY_UNIT}</span>
      }
    },
    {
      title: 'Thao tác',
      key: 'actions',
      className: 'text-right',
      render: (_, r) => (
        <div className="flex justify-end space-x-1">
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100/50 hover:text-blue-700 transition-all rounded-lg active:scale-90"
            onClick={() => handleEdit(r)}
            title="Chỉnh sửa"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button 
            variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50 transition-colors"
            onClick={() => handleDelete(r.id)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </Button>
        </div>
      )
    }
  ];

  return (
    <Table 
      columns={columns} 
      data={receipts} 
      loading={loading} 
      emptyMessage="Không tìm thấy phiếu nhập nào"
    />
  );
}
