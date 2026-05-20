# 🎨 Frontend Web App - XD_HTTQL

Giao diện quản lý hiện đại, mượt mà và trực quan, được xây dựng trên nền tảng **React 19** và **Vite**.

---

## 🛠️ Công nghệ sử dụng
- **Core:** React 19 (Hooks, Context API)
- **Tooling:** Vite (Cực nhanh)
- **State Management:** Redux Toolkit (@reduxjs/toolkit)
- **Styling:** Tailwind CSS v4 (Tiện dụng & Hiệu năng)
- **Charts:** Recharts (Biểu đồ doanh thu & thống kê)
- **Icons:** Lucide React & React Icons
- **Notifications:** React Toastify
- **Data Fetching:** Axios & TanStack Query (React Query)
- **Maps:** Leaflet & React Leaflet (Quản lý vị trí)
- **Utilities:** Lodash, PapaParse (CSV), XLSX (Excel), QR Code

---

## ✨ Tính năng nổi bật

### 📊 Dashboard & Thống kê
- Biểu đồ doanh thu trực quan (Revenue Charts).
- Thống kê sản phẩm bán chạy nhất (Top Products).
- Tổng quan tình thái đơn hàng và kho hàng theo thời gian thực.

### 🛡️ Quản lý Kho thông minh
- **Cảnh báo hàng sắp hết (Low Stock):** Tự động thông báo khi số lượng dưới mức tối thiểu.
- **Cảnh báo hết hạn (Expiry Alert):** Theo dõi ngày hết hạn của các lô hàng.
- **Báo cáo hàng tồn lâu (Deadstock):** Nhận diện sản phẩm không phát sinh giao dịch.
- **Mã QR:** Tự động tạo mã QR cho từng sản phẩm để dễ dàng truy xuất thông tin.

### 🧩 Giao diện người dùng (UI/UX)
- **Responsive:** Hoạt động hoàn hảo trên Desktop, Tablet và Mobile.
- **Layout:** Sidebar điều hướng linh hoạt, Header tích hợp thông báo.
- **Auth:** Trang Đăng nhập/Đăng ký chuyên nghiệp, quản lý Profile cá nhân.
- **Hiệu ứng:** Particles background tạo điểm nhấn thẩm mỹ.

---

## 📁 Cấu trúc thư mục
```text
frontend/
├── src/
│   ├── API/         # Cấu hình gọi API theo từng module
│   ├── assets/      # Hình ảnh, biểu tượng tĩnh
│   ├── auth/        # Hợp phần kiểm soát quyền truy cập (RequireAuth)
│   ├── components/  # Các thành phần giao diện (UI Components)
│   ├── redux/       # Cấu hình Store, Slices (Global State)
│   ├── utils/       # Các hàm helper xử lý định dạng, tính toán
│   ├── App.jsx      # Định nghĩa Route chính
│   └── main.jsx     # Điểm khởi đầu ứng dụng
├── public/          # Tài nguyên công cộng, Manifest, Service Worker
└── tailwind.config.js # Cấu hình giao diện Tailwind
```

---

## 🚀 Cài đặt & Phát triển

1. Di chuyển vào thư mục: `cd frontend`
2. Cài đặt thư viện: `npm install`
3. Cấu hình môi trường: Tạo file `.env` và thiết lập `VITE_API_URL` (mặc định là `http://localhost:3001/api/v1`).
4. Chạy chế độ phát triển:
   ```bash
   npm run dev
   ```
5. Xây dựng bản production:
   ```bash
   npm run build
   ```

---

## 📱 PWA (Progressive Web App)
Ứng dụng hỗ trợ Service Worker (`sw.js`) và Manifest, cho phép cài đặt như một ứng dụng trên màn hình điện thoại hoặc máy tính, hỗ trợ hoạt động mượt mà hơn.
