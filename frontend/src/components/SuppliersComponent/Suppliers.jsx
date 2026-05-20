import React, { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../API/suppliersApi/suppliersApi";
import { useSelector } from "react-redux";

// Common Components
import Button from '../common/Button';
import Input from '../common/Input';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

function SuppliersPage() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSuppliers = useCallback(async () => {
      setLoading(true);
      try {
        const res = await getAllSuppliers({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
        });
        setSuppliers(res.suppliers || []);
        setTotalPages(res.totalPages || 1);
      } catch (error) {
        toast.error(error.message || "Failed to fetch suppliers");
        setSuppliers([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [currentPage, itemsPerPage, searchTerm]);

    useEffect(() => {
      fetchSuppliers();
    }, [fetchSuppliers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateSupplier(editId, form);
        toast.success("Cập nhật nhà cung cấp thành công");
      } else {
        await createSupplier(form);
        toast.success("Thêm nhà cung cấp thành công");
      }
      setIsModalOpen(false);
      fetchSuppliers();
    } catch (error) {
      toast.error(error.message || "Thao tác thất bại");
    }
  };

  const handleEdit = (supplier) => {
    setForm({
      name: supplier.name || "",
      phoneNumber: supplier.phoneNumber || "",
      address: supplier.address || "",
      description: supplier.description || "",
    });
    setIsEditing(true);
    setEditId(supplier.id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedSupplier) return;
    try {
      await deleteSupplier(selectedSupplier.id);
      toast.success("Xóa thành công");
      fetchSuppliers();
    } catch (error) {
      toast.error(error.message || "Xóa thất bại");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedSupplier(null);
    }
  };

  const confirmDelete = (supplier) => {
    if (currentUser.role !== "admin") {
      toast.warning("Chỉ Admin mới có quyền xóa!");
      return;
    }
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      className: 'w-16 text-center',
    },
    {
      title: 'Nhà cung cấp',
      key: 'name',
      render: (name) => <span className="font-bold text-textPrimary">{name}</span>
    },
    {
      title: 'Số điện thoại',
      key: 'phoneNumber',
      render: (phone) => phone || "-"
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      render: (address) => <div className="max-w-xs truncate text-xs text-textSecondary" title={address}>{address || "-"}</div>
    },
    {
      title: 'Mô tả',
      key: 'description',
      render: (desc) => <div className="max-w-xs truncate italic text-textSecondary">{desc || "-"}</div>
    },
    {
      title: 'Thao tác',
      key: 'actions',
      className: 'text-right',
      render: (_, supplier) => (
        <div className="flex justify-end space-x-1">
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100/50 hover:text-blue-700 transition-all rounded-lg active:scale-90"
            onClick={() => handleEdit(supplier)}
            title="Sửa"
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
            onClick={() => confirmDelete(supplier)}
            title="Xóa"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight">
            Nhà Cung Cấp
          </h1>
          <p className="text-textSecondary mt-1">Quản lý các đối tác và nguồn cung hàng hóa</p>
        </div>
        
        <Button 
          variant="gradient" 
          size="lg"
          onClick={() => {
            setForm({ name: "", phoneNumber: "", address: "", description: "" });
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
        >
          Thêm nhà cung cấp
        </Button>
      </div>

      <Card>
        <div className="flex justify-end mb-6">
          <div className="w-full md:w-80">
            <Input
              placeholder="Tìm kiếm nhà cung cấp..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          data={suppliers} 
          loading={loading} 
          emptyMessage="Không có nhà cung cấp nào."
        />

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp mới"}
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button variant="gradient" onClick={handleSubmit}>
              {isEditing ? "Cập nhật" : "Lưu đối tác"}
            </Button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Tên nhà cung cấp"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Nhập tên doanh nghiệp/cá nhân"
          />
          <Input
            label="Số điện thoại"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            placeholder="09xx xxx xxx"
          />
          <Input
            label="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Địa chỉ trụ sở"
          />
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-textPrimary">Ghi chú / Mô tả</label>
            <textarea
              className="w-full rounded-lg border border-border bg-white px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary min-h-[100px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Thông tin thêm về nhà cung cấp..."
            />
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa nhà cung cấp"
        message={`Bạn có chắc muốn xóa nhà cung cấp "${selectedSupplier?.name}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}

export default SuppliersPage;
