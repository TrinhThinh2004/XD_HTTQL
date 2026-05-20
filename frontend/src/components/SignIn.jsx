import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignInUser } from "../API/user/userApi";
import { login } from "../redux/slice/userSlice";
import { toast } from "react-toastify";

// Common Components
import Button from './common/Button';
import Input from './common/Input';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const access_token = useSelector((state) => state.user.access_token);
  if (access_token) return <Navigate to="/" replace />;

  const handleSignin = async (e) => {
    if (e) e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await SignInUser(email, password);

      if (data?.errCode === 0) {
        if (data.user.status === "Bị khóa") {
          const lockMsg = "Tài khoản bị khóa. Vui lòng liên hệ quản lý!";
          toast.error(lockMsg);
          setError(lockMsg);
          setIsLoading(false);
          return;
        }

        dispatch(
          login({
            ...data.user,
            access_token: data.access_token,
          })
        );

        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        const failMsg = data.message || "Email hoặc mật khẩu không đúng";
        toast.error(failMsg);
        setError(failMsg);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Lỗi kết nối đến máy chủ";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primaryLight opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-accent opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-border relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-4 transform rotate-12">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-textPrimary tracking-tight">
            WMS Pro <span className="text-primary">v2.0</span>
          </h1>
          <p className="text-textSecondary mt-2 font-medium">Đăng nhập để bắt đầu phiên làm việc</p>
        </div>

        <form className="space-y-6" onSubmit={handleSignin}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
            disabled={isLoading}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          />

          <div className="relative">
            <Input
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-textSecondary hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            variant="gradient"
            isLoading={isLoading}
          >
            Đăng nhập ngay
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border flex flex-col items-center">
          <p className="text-sm text-textSecondary">
            Chưa có tài khoản?{" "}
            <Link
              to="/sign-up"
              className="text-primary font-bold hover:underline"
            >
              Yêu cầu đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
