import React, { useEffect, useState, useMemo } from "react";
import { getAllStock, deleteStock } from "../../API/stock/stockAPI";
import InventoryStatusCard from "./InventoryStatusCard";
import InventoryListCard from "./InventoryListCard";
import AuditLogs from "./AuditLogs";
import { toast } from "react-toastify";
import CreateProduct from "../ProductsComponent/CreateProduct";
import EditProduct from "../ProductsComponent/EditProduct";
import ProductDetail from "../ProductsComponent/ProductDetail";
import QRCodeGenerator from "../QRCodeGenerator";

// Common Components
import Button from '../common/Button';
import Input from '../common/Input';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

function Inventory() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await getAllStock();
      const formatted = (data || []).map((stock) => ({
        ...stock,
        id: stock.id,
        name: stock.name || "Không rõ",
        price: stock.price || 0,
        lastUpdated: stock.updatedAt,
      }));
      setInventoryItems(formatted);
    } catch (err) {
      toast.error("Lỗi khi tải dữ liệu tồn kho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteStock(selectedProduct.id);
      setInventoryItems((prev) => prev.filter((item) => item.id !== selectedProduct.id));
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      toast.error("Xóa thất bại");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const filteredItems = useMemo(() => {
    return inventoryItems
      .filter((item) => {
        if (activeTab === "all") return true;
        return item.status === activeTab;
      })
      .filter((item) => {
        if (!searchTerm) return true;
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toString().includes(searchTerm)
        );
      });
  }, [inventoryItems, activeTab, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, page]);

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, index) => (page - 1) * itemsPerPage + index + 1,
      className: 'w-16'
    },
    {
      title: 'Sản phẩm',
      key: 'name',
      render: (name, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
             {row.image ? (
               <img src={row.image} alt={name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-textSecondary">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
               </div>
             )}
          </div>
          <span className="font-semibold text-textPrimary">{name}</span>
        </div>
      )
    },
    {
      title: 'Danh mục',
      key: 'category',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, item) => {
        const status = item.stock === 0 ? "Hết hàng" : item.stock < 10 ? "Sắp hết" : "Còn hàng";
        const variant = status === "Hết hàng" ? "red" : status === "Sắp hết" ? "yellow" : "green";
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      title: 'Giá',
      key: 'price',
      render: (price) => <span>{price.toLocaleString()}đ</span>
    },
    {
      title: 'Số lượng',
      key: 'stock',
      render: (stock, row) => <span className="font-medium">{stock} {row.unit}</span>
    },
    {
      title: 'Cập nhật',
      key: 'lastUpdated',
      render: (date) => <span className="text-textSecondary text-xs">{new Date(date).toLocaleDateString("vi-VN")}</span>
    },
    {
      title: 'Thao tác',
      key: 'actions',
      className: 'text-right',
      render: (_, item) => (
        <div className="flex justify-end space-x-1">
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 transition-colors" 
            onClick={() => { setSelectedProduct(item); setIsQrModalOpen(true); }}
            title="Mã QR"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </Button>
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 transition-colors" 
            onClick={() => { setSelectedProduct(item); setIsDetailModalOpen(true); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </Button>
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100/50 hover:text-blue-700 transition-all rounded-lg active:scale-90" 
            onClick={() => { setSelectedProduct(item); setIsEditModalOpen(true); }}
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
            onClick={() => { setSelectedProduct(item); setIsDeleteModalOpen(true); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight">
            Quản Lý Tồn Kho
          </h1>
          <p className="text-textSecondary mt-1">Kiểm soát mức độ hàng hóa và vị trí lưu kho</p>
        </div>
        
        <Button 
          variant="gradient" 
          size="lg"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {["all", "Còn hàng", "Hết hàng"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setPage(1); }}
                className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                {tab === "all" ? "Tất cả" : tab}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          data={currentItems} 
          loading={loading} 
        />

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-textSecondary bg-gray-50 px-3 py-1 rounded-full">
            Hiển thị <span className="font-bold text-primary">{currentItems.length}</span> / {filteredItems.length} sản phẩm
          </div>
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
            className="mt-0"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryStatusCard inventoryItems={inventoryItems} />
        <InventoryListCard
          inventoryItems={inventoryItems}
        />
      </div>

      <AuditLogs />

      {/* Modals */}
      <Modal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Mã QR Sản phẩm"
        size="sm"
      >
        <QRCodeGenerator
          productData={selectedProduct}
          onClose={() => setIsQrModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Thêm sản phẩm mới"
        size="lg"
      >
        <CreateProduct onSuccess={() => { setIsCreateModalOpen(false); fetchInventory(); }} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Chỉnh sửa sản phẩm"
        size="lg"
      >
        <EditProduct
          productData={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => { setIsEditModalOpen(false); fetchInventory(); }}
        />
      </Modal>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Chi tiết sản phẩm"
        size="md"
      >
        <ProductDetail productData={selectedProduct} />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${selectedProduct?.name}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}

export default Inventory;

