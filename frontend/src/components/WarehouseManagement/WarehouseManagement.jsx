import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ImportReceipts from "../ImportReceiptComponent/ImportReceipt";
import ImportDetails from "../ImportDetailComponent/ImportDetails";
import ExportReceipts from "../ExportReceiptsComponent/ExportReceipts";
import ExportDetails from "../ExportDetailsComponent/ExportDetails";

export default function WarehouseManagement() {
  const location = useLocation();
  const stateTab = location.state?.tab;

  const [activeTab, setActiveTab] = useState(() => {
    return (
      stateTab || localStorage.getItem("activeWarehouseTab") || "importReceipts"
    );
  });

  useEffect(() => {
    localStorage.setItem("activeWarehouseTab", activeTab);
  }, [activeTab]);

  const menuItems = [
    {
      id: "importReceipts",
      label: "Phiếu nhập",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2M4 13H6m8 0v4m-4-4v4" />
        </svg>
      ),
    },
    {
      id: "importDetails",
      label: "Chi tiết nhập",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight">
            Quản Lý Hóa Đơn
          </h1>
          <p className="text-textSecondary mt-1">Quản lý nhập xuất kho và chi tiết chứng từ</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                ${
                  activeTab === item.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="animate-in fade-in duration-300">
        {activeTab === "importReceipts" && <ImportReceipts />}
        {activeTab === "importDetails" && <ImportDetails />}
        {activeTab === "exportReceipts" && <ExportReceipts />}
        {activeTab === "exportDetails" && <ExportDetails />}
      </div>
    </div>
  );
}
