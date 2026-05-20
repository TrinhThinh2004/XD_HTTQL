import React, { useEffect, useState } from "react";
import { GetDetailUser, UpdateDetailUser } from "../API/user/userApi";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiSave,
  FiUpload,
  FiHome,
  FiMapPin,
  FiSettings,
  FiCamera,
} from "react-icons/fi";
import { arrayBufferToString } from "../utils/arrayBufferToString";

const InputField = ({ label, value, onChange, icon, disabled, onEnter }) => (
  <div className="space-y-2 group">
    <label className="text-sm font-bold text-textSecondary flex items-center group-focus-within:text-primary transition-colors">
      <span className="mr-2 opacity-70 group-focus-within:opacity-100 transition-opacity">{icon}</span>
      {label}
    </label>
    <div className={`relative flex items-center bg-white border ${disabled ? 'border-gray-100 bg-gray-50' : 'border-border group-focus-within:border-primary group-focus-within:ring-4 group-focus-within:ring-primary/10'} rounded-2xl px-4 py-3 transition-all duration-300`}>
      <input
        type="text"
        className="w-full bg-transparent outline-none text-textPrimary font-medium disabled:text-textSecondary"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={`Nhập ${label.toLowerCase()}...`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
      />
    </div>
  </div>
);

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    role: "",
    avatarBase64: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;
        if (!userId) return;

        const res = await GetDetailUser(userId);
        if (res.errCode === 0 && res.users.length > 0) {
          const data = res.users[0];
          let avatarBase64 = "";
          if (data.image?.data?.length > 0) {
            avatarBase64 = arrayBufferToString(data.image.data);
          }
          setUser({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            role: data.role || "",
            avatarBase64,
          });
          setAvatarPreview(avatarBase64 || null);
        } else {
          toast.error(res.message || "Lấy thông tin người dùng thất bại!");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;
      if (!userId) return;

      const res = await UpdateDetailUser({ id: userId, ...user });
      if (res.errCode === 0) {
        toast.success("Cập nhật thông tin thành công!");
        // Cập nhật lại thông tin mới nhất
        const refreshed = await GetDetailUser(userId);
        if (refreshed.errCode === 0 && refreshed.users.length > 0) {
          const data = refreshed.users[0];
          let avatarBase64 = "";
          if (data.image?.data?.length > 0) {
            avatarBase64 = arrayBufferToString(data.image.data);
          }
          setUser({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            role: data.role || "",
            avatarBase64,
          });
          setAvatarPreview(avatarBase64 || null);
        }
      } else {
        toast.error(res.message || "Lỗi cập nhật!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Lỗi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh hợp lệ!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setUser((prev) => ({ ...prev, avatarBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-blue-50 min-h-screen pb-12">
      {/* Header Background */}
      <div className="h-48 w-full gradient-bg relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-white p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl ring-4 ring-primary/20 bg-blue-50 relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary bg-gradient-to-br from-primary/10 to-primaryLight/10">
                      <FiUser size={60} />
                    </div>
                  )}
                  <label
                    htmlFor="avatarInput"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center text-white scale-75 group-hover:scale-100 transition-transform">
                      <FiCamera size={28} className="mb-1" />
                      <span className="text-xs font-bold uppercase tracking-wider">Đổi ảnh</span>
                    </div>
                  </label>
                </div>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">
                  {user.role || "Thành viên"}
                </span>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center justify-between border-b border-border pb-6">
                <div>
                  <h1 className="text-3xl font-black text-textPrimary leading-none mb-2">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-textSecondary flex items-center text-sm font-medium">
                    <FiMail className="mr-2 text-primary" /> {user.email}
                  </p>
                </div>
                <div className="hidden sm:flex space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-border flex items-center justify-center text-primary shadow-sm">
                    <FiSettings size={18} />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <InputField
                    label="Họ"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    icon={<FiUser size={16} />}
                    onEnter={handleSubmit}
                  />
                  <InputField
                    label="Tên"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    icon={<FiUser size={16} />}
                    onEnter={handleSubmit}
                  />
                  <InputField
                    label="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    icon={<FiMail size={16} />}
                    disabled
                  />
                  <InputField
                    label="Số điện thoại"
                    value={user.phoneNumber}
                    onChange={(e) =>
                      setUser({ ...user, phoneNumber: e.target.value })
                    }
                    onEnter={handleSubmit}
                    icon={<FiPhone size={16} />}
                  />
                </div>

                <InputField
                  label="Địa chỉ"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  icon={<FiMapPin size={16} />}
                  onEnter={handleSubmit}
                />

                <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Đang lưu...
                      </div>
                    ) : (
                      <>
                        <FiSave size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                        Lưu thông tin cá nhân
                      </>
                    )}
                  </button>
                  <p className="text-xs text-textSecondary text-center sm:text-left italic">
                    * Thông tin vai trò chỉ có thể thay đổi bởi quản trị viên.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Decorative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Bảo mật', desc: 'Mật khẩu và xác thực 2 lớp', icon: <FiShield />, color: 'bg-green-500' },
            { label: 'Địa chỉ', desc: 'Quản lý danh sách địa chỉ nhận hàng', icon: <FiHome />, color: 'bg-blue-500' },
            { label: 'Cài đặt', desc: 'Cấu hình thông báo và giao diện', icon: <FiSettings />, color: 'bg-purple-500' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border border-border hover:border-primary/30 transition-all cursor-pointer group">
              <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-textPrimary mb-1">{item.label}</h3>
              <p className="text-xs text-textSecondary font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
