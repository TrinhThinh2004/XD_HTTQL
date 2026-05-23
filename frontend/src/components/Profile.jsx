import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, resetUser } from "../redux/slice/userSlice";
import { GetDetailUser, UpdateDetailUser, UserLogout, ChangePassword } from "../API/user/userApi";
import { getInventoryLogs } from "../API/inventory/inventoryAPI";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiMapPin,
  FiSettings,
  FiCamera,
  FiLogOut,
  FiActivity,
  FiLock,
  FiClock,
  FiPackage,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiArrowLeft,
  FiInfo,
  FiSave
} from "react-icons/fi";
import { arrayBufferToString } from "../utils/arrayBufferToString";
import { cn } from "../utils/cn";
import Input from "./common/Input";
import Button from "./common/Button";
import Card from "./common/Card";
import Badge from "./common/Badge";
import ConfirmModal from "./common/ConfirmModal";
import Modal from "./common/Modal";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityLogs, setActivityLogs] = useState([]);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    role: "",
    avatarBase64: "",
    status: "",
    gender: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fetchUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;
      if (!userId) return;

      const res = await GetDetailUser(userId);
      if (res.errCode === 0 && res.users.length > 0) {
        const data = res.users[0];
        let avatarBase64 = "";
        
        // Handle image data (could be string or Buffer from legacy BLOB)
        if (typeof data.image === 'string') {
          avatarBase64 = data.image;
        } else if (data.image?.data?.length > 0) {
          avatarBase64 = arrayBufferToString(data.image.data);
        }

        const userData = {
          id: data.id,
          email: data.email || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          role: data.role || "",
          avatarBase64,
          status: data.status || "",
          gender: data.gender || "",
        };

        setUser(userData);
        setAvatarPreview(avatarBase64 || null);
        
        // Cập nhật Local Storage và Redux để đồng bộ toàn bộ app
        const currentLocal = JSON.parse(localStorage.getItem("user"));
        const updatedLocal = { ...currentLocal, ...userData };
        localStorage.setItem("user", JSON.stringify(updatedLocal));
        dispatch(login(updatedLocal));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await UpdateDetailUser(user);
      if (res.errCode === 0) {
        toast.success("Cập nhật thông tin thành công!");
        await fetchUser();
      } else {
        toast.error(res.message || "Lỗi cập nhật!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Lỗi cập nhật hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setUser((prev) => ({ ...prev, avatarBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      const result = await UserLogout();
      if (result?.errCode === 0) {
        localStorage.removeItem("user");
        dispatch(resetUser());
        toast.success("Đăng xuất thành công!");
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error("Lỗi khi đăng xuất");
    } finally {
      setShowLogoutModal(false);
    }
  };

  const fetchActivityLogs = async () => {
    setLoading(true);
    try {
      const res = await getInventoryLogs({ userId: user.id });
      setActivityLogs(res || []);
      setShowActivityModal(true);
    } catch (err) {
      toast.error("Lỗi khi tải lịch sử hoạt động!");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu mới không khớp!");
      return;
    }
    setLoading(true);
    try {
      const res = await ChangePassword({
        id: user.id,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.errCode === 0) {
        toast.success("Đổi mật khẩu thành công!");
        setShowPasswordModal(false);
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.errMessage || "Lỗi đổi mật khẩu!");
      }
    } catch (err) {
      toast.error("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  const controlItems = [
    { 
      icon: <FiActivity />, 
      label: "Hoạt động gần đây", 
      color: "text-primary",
      action: fetchActivityLogs
    },
    { 
      icon: <FiShield />, 
      label: "Bảo mật & Quyền riêng tư", 
      color: "text-success",
      action: () => setShowPasswordModal(true)
    },
    { 
      icon: <FiSettings />, 
      label: "Cấu hình hệ thống", 
      color: "text-info", 
      path: "/settings" 
    },
    { 
      icon: <FiLogOut />, 
      label: "Đăng xuất tài khoản", 
      color: "text-error", 
      action: () => setShowLogoutModal(true) 
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 animate-in fade-in duration-700 pb-8">
      {/* Ultra-Compact Header Banner */}
      <div className="relative h-32 w-full rounded-[1.5rem] overflow-hidden shadow-md border border-white/20 dark:border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent opacity-90 dark:opacity-80" />
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 z-10 p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all duration-300 border border-white/20 active:scale-90 shadow-sm"
          title="Quay lại"
        >
          <FiArrowLeft size={16} />
        </button>

        <div className="absolute bottom-4 left-6 flex items-end gap-x-4">
          <div className="relative group">
            <div className="size-20 rounded-2xl overflow-hidden border-2 border-white dark:border-dark-border shadow-lg bg-bg-subtle dark:bg-dark-card relative transition-transform duration-500 hover:scale-105">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="size-full object-cover" />
              ) : (
                <div className="size-full flex items-center justify-center text-primary bg-primary/10 font-black text-xl uppercase">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </div>
              )}
              <label htmlFor="avatarInput" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm">
                <FiCamera size={18} className="text-white" />
              </label>
            </div>
            <input id="avatarInput" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div className="pb-0.5 text-white">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-none mb-1">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex items-center gap-x-2">
              <Badge variant="neutral" className="bg-white/10 border-white/20 text-white text-[8px] py-0 px-1.5 backdrop-blur-md uppercase font-black">
                {user.role || "Thành viên"}
              </Badge>
              <span className="text-white/80 text-[10px] font-medium flex items-center">
                <FiMail className="mr-1" size={10} /> {user.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left column: Actions & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-y-4">
          <Card title="Chức năng" className="shadow-sm py-2 px-3">
            <div className="flex flex-col gap-y-0.5">
              {controlItems.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => {
                    if (item.path) navigate(item.path);
                    if (item.action) item.action();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-bg-subtle dark:hover:bg-white/[0.03] transition-all group text-left"
                >
                  <div className="flex items-center gap-x-2.5">
                    <span className={cn("size-3.5", item.color)}>{item.icon}</span>
                    <span className="text-[10px] font-bold text-text-primary uppercase tracking-tight">{item.label}</span>
                  </div>
                  <FiArrowUpRight className="size-3 text-text-tertiary opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          </Card>

          <div className="bg-white dark:bg-dark-card p-4 rounded-[1.25rem] border border-border/40 dark:border-dark-border/40 shadow-sm relative overflow-hidden">
            <h4 className="text-[9px] font-black text-text-tertiary uppercase tracking-widest mb-3 flex items-center">
              <FiActivity className="mr-1.5 text-primary" size={10} /> Thống kê cá nhân
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-bg-light/50 dark:bg-white/[0.02] p-2.5 rounded-xl border border-border/20">
                <p className="text-[7px] font-black text-text-tertiary uppercase mb-0.5">Phiếu lập</p>
                <p className="text-base font-black text-text-primary">128</p>
              </div>
              <div className="bg-bg-light/50 dark:bg-white/[0.02] p-2.5 rounded-xl border border-border/20">
                <p className="text-[7px] font-black text-text-tertiary uppercase mb-0.5">Đơn hàng</p>
                <p className="text-base font-black text-text-primary">42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Update Form */}
        <div className="lg:col-span-8">
          <Card title="Chỉnh sửa thông tin" extra={<FiUser className="text-primary" size={14} />} className="h-full py-4 px-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Họ"
                  value={user.firstName}
                  onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Họ"
                  className="py-2 text-[11px]"
                />
                <Input
                  label="Tên"
                  value={user.lastName}
                  onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Tên"
                  className="py-2 text-[11px]"
                />
                <Input
                  label="Số điện thoại"
                  value={user.phoneNumber}
                  onChange={(e) => setUser(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="09xx..."
                  className="py-2 text-[11px]"
                />
                <Input
                  label="Email"
                  value={user.email}
                  disabled
                  leftIcon={<FiMail size={12} />}
                  className="py-2 text-[11px]"
                />
              </div>

              <div className="flex flex-col gap-y-1">
                <label className="text-[9px] font-black text-text-tertiary ml-1 uppercase tracking-widest flex items-center space-x-1">
                  <span>Địa chỉ</span>
                  <div className="w-1 h-1 rounded-full bg-primary/30" />
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-3 text-text-tertiary group-focus-within:text-primary transition-colors">
                    <FiMapPin size={12} />
                  </div>
                  <textarea
                    value={user.address}
                    onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))}
                    rows="2"
                    className="w-full pl-10 pr-4 py-2.5 bg-bg-subtle/30 dark:bg-dark-card/40 border border-border/50 dark:border-dark-border/60 text-text-primary text-[11px] rounded-xl outline-none transition-all duration-300 focus:bg-white dark:focus:bg-dark-card focus:border-primary focus:ring-2 focus:ring-primary/5 font-bold shadow-inner-sm resize-none"
                    placeholder="Địa chỉ..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40 dark:border-dark-border/40 mt-2">
                <div className="flex items-center text-text-tertiary opacity-60">
                   <FiShield className="mr-1.5 text-success" size={12} />
                   <span className="text-[8px] font-bold uppercase italic">Dữ liệu an toàn</span>
                </div>
                <Button
                  type="submit"
                  isLoading={loading}
                  size="sm"
                  className="px-6 rounded-lg text-[10px]"
                  leftIcon={<FiSave size={12} />}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn rời khỏi hệ thống? Phiên làm việc hiện tại sẽ kết thúc."
        confirmText="Đăng xuất"
        variant="danger"
      />

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Bảo mật tài khoản"
        size="sm"
      >
        <form onSubmit={handleChangePassword} className="flex flex-col gap-y-6 p-2">
          <div className="flex flex-col items-center mb-6">
            <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-3 shadow-inner-sm">
              <FiLock size={32} />
            </div>
            <p className="text-[10px] font-black text-text-tertiary uppercase tracking-widest text-center max-w-[200px]">
              Vui lòng nhập mật khẩu hiện tại để xác minh danh tính
            </p>
          </div>
          
          <Input
            label="Mật khẩu hiện tại"
            type="password"
            required
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))}
            placeholder="••••••••"
          />
          <Input
            label="Mật khẩu mới"
            type="password"
            required
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            placeholder="••••••••"
          />
          <Input
            label="Xác nhận mật khẩu mới"
            type="password"
            required
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="••••••••"
          />
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              type="button"
              className="flex-1 h-12 rounded-2xl"
              onClick={() => setShowPasswordModal(false)}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              className="flex-1 h-12 rounded-2xl shadow-primary/30"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        title="Lịch sử hoạt động"
        size="md"
      >
        <div className="flex flex-col gap-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {activityLogs.length > 0 ? (
            activityLogs.map((log) => (
              <div key={log.id || log.createdAt} className="flex items-start gap-x-4 p-4 rounded-2xl bg-bg-subtle/30 dark:bg-white/[0.02] border border-border/40 dark:border-dark-border/40 hover:bg-white dark:hover:bg-dark-card transition-all group">
                <div className={cn(
                  "size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                  log.change_type === "IMPORT" ? "bg-success/10 text-success" : 
                  log.change_type === "EXPORT" ? "bg-error/10 text-error" : "bg-info/10 text-info"
                )}>
                  {log.change_type === "IMPORT" ? <FiArrowDownLeft size={20} /> : 
                   log.change_type === "EXPORT" ? <FiArrowUpRight size={20} /> : <FiClock size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xs font-black text-text-primary uppercase tracking-tight truncate">
                      {log.stock?.product?.name || "Sản phẩm hệ thống"}
                    </h4>
                    <span className="text-[10px] font-bold text-text-tertiary whitespace-nowrap bg-bg-subtle dark:bg-white/5 px-2 py-0.5 rounded-lg">
                      {new Date(log.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Badge variant={log.change_type === "IMPORT" ? "success" : log.change_type === "EXPORT" ? "error" : "info"} size="sm">
                      {log.change_type}
                    </Badge>
                    <span className="text-[11px] font-bold text-text-secondary">
                      Số lượng: <span className={cn(log.quantity > 0 ? "text-success" : "text-error")}>
                        {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 opacity-30">
              <FiPackage size={48} className="mx-auto mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Không có lịch sử hoạt động</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
