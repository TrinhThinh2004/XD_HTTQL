import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  DeleteUser,
  GetDetailUser,
  SignUpUser,
  UpdateDetailUser,
} from "../../API/user/userApi";

// Common Components
import Button from '../common/Button';
import Input from '../common/Input';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

export default function UsersComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    gender: "Nam",
    status: "Hoạt động",
    address: "",
    phoneNumber: "",
  });

  const [filters, setFilters] = useState({
    search: "",
    role: "All",
    status: "All",
    gender: "All",
  });

  const loadUsers = () => {
    setLoading(true);
    GetDetailUser("All")
      .then((res) => {
        if (res.errCode === 0) {
          setUsers(res.users || []);
        } else {
          toast.error(res.errMessage || "Lỗi tải dữ liệu!");
        }
      })
      .catch(() => toast.error("Lỗi tải dữ liệu!"))
      .finally(() => setLoading(false));
  };

  useEffect(() => loadUsers(), []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        filters.search === "" ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) ||
        u.email?.toLowerCase().includes(filters.search.toLowerCase());
      const matchRole = filters.role === "All" || u.role === filters.role;
      const matchStatus = filters.status === "All" || u.status === filters.status;
      const matchGender = filters.gender === "All" || u.gender === filters.gender;
      return matchSearch && matchRole && matchStatus && matchGender;
    });
  }, [users, filters]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(start, start + usersPerPage);
  }, [filteredUsers, currentPage, usersPerPage]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const userData = isEditing ? { ...form, id: editId } : form;
    const action = isEditing
      ? UpdateDetailUser(userData)
      : SignUpUser(userData);

    action
      .then((res) => {
        if (res.errCode === 0) {
          toast.success(isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!");
          loadUsers();
          setIsModalOpen(false);
        } else {
          toast.error(res.errMessage || "Đã có lỗi xảy ra!");
        }
      })
      .catch(() => toast.error("Đã có lỗi xảy ra!"));
  };

  const handleEdit = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
      gender: user.gender,
      status: user.status,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
    setEditId(user.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    DeleteUser(selectedUser.id)
      .then(() => {
        toast.success("Xóa người dùng thành công!");
        loadUsers();
      })
      .catch(() => toast.error("Xóa thất bại!"))
      .finally(() => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      });
  };

  const columns = [
    {
      title: 'Nhân viên',
      key: 'name',
      render: (_, u) => (
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
            {u.firstName?.[0]}{u.lastName?.[0]}
          </div>
          <div>
            <div className="text-sm font-bold text-textPrimary">{u.lastName} {u.firstName}</div>
            <div className="text-xs text-textSecondary">{u.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Số điện thoại',
      key: 'phoneNumber',
      render: (val) => val || "-"
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (role) => (
        <Badge variant={role === 'admin' ? 'red' : 'green'}>{role}</Badge>
      )
    },
    {
      title: 'Giới tính',
      key: 'gender',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (status) => (
        <Badge variant={status === 'Hoạt động' ? 'green' : 'red'}>{status}</Badge>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      className: 'text-right',
      render: (_, u) => (
        <div className="flex justify-end space-x-1">
          <Button 
            variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100/50 hover:text-blue-700 transition-all rounded-lg active:scale-90"
            onClick={() => handleEdit(u)}
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
          {u.role !== "admin" && (
            <Button 
              variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50 transition-colors"
              onClick={() => {
                setSelectedUser(u);
                setIsDeleteModalOpen(true);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight">
            Quản Lý Nhân Viên
          </h1>
          <p className="text-textSecondary mt-1">Quản lý tài khoản và phân quyền người dùng trong hệ thống</p>
        </div>

        <Button
          variant="gradient"
          size="lg"
          onClick={() => {
            setForm({
              firstName: "", lastName: "", email: "", password: "",
              role: "user", gender: "Nam", status: "Hoạt động",
              address: "", phoneNumber: ""
            });
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
        >
          Thêm nhân viên mới
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1">
            <Input
              name="search"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={filters.search}
              onChange={handleFilterChange}
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            />
          </div>
          <div className="flex gap-2">
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="p-2 border border-border rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary/30 outline-none"
            >
              <option value="All">Tất cả vai trò</option>
              <option value="admin">Quản lý</option>
              <option value="Kế toán">Kế toán</option>
              <option value="Nhân viên">Nhân viên</option>
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="p-2 border border-border rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary/30 outline-none"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Bị khóa">Bị khóa</option>
            </select>
          </div>
        </div>

        <Table 
          columns={columns} 
          data={currentUsers} 
          loading={loading} 
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
        title={isEditing ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button variant="gradient" onClick={handleSubmit}>
              {isEditing ? "Cập nhật" : "Tạo tài khoản"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Họ" name="firstName" value={form.firstName} onChange={handleChange} required />
            <Input label="Tên" name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {!isEditing && (
              <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
            )}
            <Input 
              label={isEditing ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu"} 
              type="password" name="password" value={form.password} onChange={handleChange} required={!isEditing} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Địa chỉ" name="address" value={form.address} onChange={handleChange} />
            <Input label="Số điện thoại" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-textPrimary">Vai trò</label>
              <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border border-border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/30">
                <option value="admin">Quản lý</option>
                <option value="Kế toán">Kế toán</option>
                <option value="Nhân viên">Nhân viên</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-textPrimary">Giới tính</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border border-border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/30">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-textPrimary">Trạng thái</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border border-border rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/30">
                <option value="Hoạt động">Hoạt động</option>
                <option value="Bị khóa">Bị khóa</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa nhân viên"
        message={`Bạn có chắc muốn xóa nhân viên "${selectedUser?.lastName} ${selectedUser?.firstName}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}
