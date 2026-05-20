import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../redux/slice/userSlice";
import { UserLogout } from "../API/user/userApi";
import { toast } from "react-toastify";
import { bufferToBase64 } from "../utils/arrayBufferToString";

function Header() {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const userMenuRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await UserLogout();

      if (result?.errCode === 0) {
        localStorage.removeItem("user");
        dispatch(resetUser());
        toast.success("Đăng xuất thành công!");
        navigate("/sign-in");
      } else {
        toast.error(result?.message || "Đăng xuất thất bại");
      }
    } catch (error) {
      toast.error("Lỗi server khi đăng xuất");
      console.error(error);
    } finally {
      setShowLogoutModal(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    return (firstName?.[0] || "") + (lastName?.[0] || "");
  };

  const avatarBase64 = currentUser?.image
    ? bufferToBase64(currentUser.image)
    : null;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 transform group-hover:rotate-12 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-transparent hidden sm:block">
              WMS{" "}
              <span className="text-xs font-normal text-textSecondary align-top ml-1">
                v2.0
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {currentUser && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20">
                    {avatarBase64 ? (
                      <img
                        src={avatarBase64}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-primaryLight flex items-center justify-center text-white font-bold text-sm">
                        {getInitials(
                          currentUser.firstName,
                          currentUser.lastName,
                        ) || "U"}
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-textPrimary leading-none">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="text-[10px] text-textSecondary mt-1 capitalize">
                      {currentUser.role || "Nhân viên"}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-textSecondary transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs text-textSecondary">
                        Đăng nhập với
                      </p>
                      <p className="text-sm font-semibold text-textPrimary truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-textPrimary hover:bg-primaryLight/10 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-textSecondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={() => {
                        toast.info("Chức năng đang phát triển");
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-textPrimary hover:bg-primaryLight/10 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-textSecondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Cài đặt
                    </button>
                    <div className="border-t border-border my-2"></div>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-textPrimary text-center mb-2">
              Xác nhận đăng xuất
            </h3>
            <p className="text-textSecondary text-center mb-6">
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-textSecondary bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-lg shadow-red-500/30"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
