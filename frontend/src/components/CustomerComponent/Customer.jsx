import React, { useEffect, useState, useMemo } from "react";
import {
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  deleteManyCustomer,
} from "../../API/customer/customerApi";
import { toast } from "react-toastify";
import FilterBar from "./FilterBar";
import ExportExcel from "./ImportExportCSV";
import CustomerTable from "./CustomerTable";
import { useSelector } from "react-redux";
import AddressAutocomplete from "../AddressAutocomplete";

// Common Components
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

function Customer() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteManyModalOpen, setIsDeleteManyModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetchAllCustomers();
      if (res?.data?.errCode === 0) {
        setCustomers(res.data.customers || []);
        setError(null);
      } else {
        setError(res?.data?.errMessage || "Failed to load customers");
      }
    } catch (e) {
      setError("Error fetching customers: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    let data = [...customers];
    if (search) {
      data = data.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.email?.toLowerCase().includes(search.toLowerCase()) ||
          c.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
          c.address?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      data = data.filter((c) => c.status === statusFilter);
    }
    return data;
  }, [customers, search, statusFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(
    () =>
      filteredCustomers.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredCustomers, page, itemsPerPage]
  );

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setForm({ ...customer });
      setIsEditing(true);
    } else {
      setForm({
        id: null,
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleAddressSelect = (suggest) => {
    if (suggest?.lat && suggest?.lon) {
      setForm(prev => ({
        ...prev,
        address: suggest.display_name,
        lat: parseFloat(suggest.lat),
        lng: parseFloat(suggest.lon)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form };
      if (isEditing) {
        await updateCustomer(data);
        toast.success("Cập nhật khách hàng thành công!");
      } else {
        await createCustomer(data);
        toast.success("Tạo khách hàng thành công!");
      }
      fetchCustomers();
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Lỗi khi lưu khách hàng!");
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    try {
      const res = await deleteCustomer(selectedCustomer.id);
      if (res?.data?.errCode === 0) {
        toast.success("Xóa thành công!");
        fetchCustomers();
      } else {
        toast.error(res?.data?.errMessage || "Xóa thất bại!");
      }
    } catch (e) {
      toast.error("Lỗi khi xóa khách hàng!");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    }
  };

  const handleDeleteMultiple = async () => {
    try {
      const res = await deleteManyCustomer(selectedIds);
      if (res?.data?.errCode === 0) {
        toast.success("Xóa thành công!");
        setSelectedIds([]);
        fetchCustomers();
      } else {
        toast.error(res?.data?.errMessage || "Xóa thất bại!");
      }
    } catch (e) {
      toast.error("Xóa thất bại!");
    } finally {
      setIsDeleteManyModalOpen(false);
    }
  };

  const confirmDelete = (customer) => {
    if (currentUser.role !== "admin") {
      toast.warning("Chỉ Admin mới có quyền xóa!");
      return;
    }
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMultiple = () => {
    if (currentUser.role !== "admin") {
      toast.warning("Chỉ Admin mới có quyền xóa!");
      return;
    }
    if (!selectedIds.length) return;
    setIsDeleteManyModalOpen(true);
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id))
      setSelectedIds(selectedIds.filter((x) => x !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedCustomers.length && paginatedCustomers.length > 0) setSelectedIds([]);
    else setSelectedIds(paginatedCustomers.map((c) => c.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight">
            Quản Lý Khách Hàng
          </h1>
          <p className="text-textSecondary mt-1">Quản lý cơ sở dữ liệu khách hàng và lịch sử giao dịch</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedIds.length > 0 && (
            <Button 
              variant="danger" 
              onClick={confirmDeleteMultiple}
              leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
            >
              Xóa {selectedIds.length} mục
            </Button>
          )}
          <ExportExcel customers={customers} />
          <Button 
            variant="gradient" 
            size="lg"
            onClick={() => handleOpenModal()}
            leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
          >
            Thêm khách hàng
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center shadow-sm">
          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <CustomerTable
        customers={paginatedCustomers}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        onEdit={handleOpenModal}
        onDelete={confirmDelete}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button variant="gradient" onClick={handleSubmit}>
              {isEditing ? "Cập nhật" : "Lưu khách hàng"}
            </Button>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Tên khách hàng"
            name="name"
            placeholder="Nhập tên khách hàng"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Số điện thoại"
            name="phoneNumber"
            placeholder="09xx xxx xxx"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-textPrimary">Địa chỉ</label>
            <AddressAutocomplete
              value={form.address}
              onChange={(value) => handleChange({ target: { name: "address", value } })}
              onSelect={handleAddressSelect}
            />
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa khách hàng"
        message={`Bạn có chắc muốn xóa khách hàng "${selectedCustomer?.name}"? Hành động này không thể hoàn tác.`}
      />

      <ConfirmModal
        isOpen={isDeleteManyModalOpen}
        onClose={() => setIsDeleteManyModalOpen(false)}
        onConfirm={handleDeleteMultiple}
        title="Xác nhận xóa nhiều khách hàng"
        message={`Bạn có chắc muốn xóa ${selectedIds.length} khách hàng đã chọn? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}
export default Customer;
