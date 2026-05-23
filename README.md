# 🚀 Smart WMS v3.5.0 — Hệ Thống Quản Lý Kho Doanh Nghiệp

<div align="center">
  <img src="./public/home.png" alt="Smart WMS Dashboard" width="800" style="border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3)" />

  <br />

[![Phiên bản](https://img.shields.io/badge/Phiên_bản-3.5.0-0f766e?style=for-the-badge&logo=github)](https://github.com/yourusername/he-thong-quan-ly-kho)
[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

  <p align="center">
    <strong>Giải pháp quản lý kho bãi thông minh, bảo mật và hiệu quả dành cho doanh nghiệp hiện đại.</strong>
  </p>
</div>

---

## 🌟 Tổng quan hệ thống

**Smart WMS** là hệ thống quản lý kho (Warehouse Management System) thế hệ mới, được thiết kế để tối ưu hóa mọi quy trình từ khâu nhập hàng, kiểm kê đến xuất hàng và phân phối. Với phiên bản **v3.5.0**, hệ thống đã đạt đến độ chín muồi về cả tính năng lẫn trải nghiệm người dùng, hỗ trợ đầy đủ tiếng Việt (UTF-8).

## ✨ Điểm nổi bật trong phiên bản v3.5.0

### 📊 Thống kê & Báo cáo Thông minh

- **Dữ liệu thực tế:** Toàn bộ biểu đồ (Cơ cấu hàng hóa, Doanh thu, Tăng trưởng) hiện đã được kết nối trực tiếp với API backend, phản ánh chính xác tình trạng kho hàng theo thời gian thực.
- **Biểu đồ Bento:** Giao diện Dashboard được thiết kế theo phong cách Bento Grid hiện đại, giúp nắm bắt thông tin nhanh chóng và trực quan.

### 📦 Quản lý Xuất kho Nâng cao

- **Đa mặt hàng:** Hỗ trợ tạo phiếu xuất với nhiều sản phẩm cùng lúc trong một giao diện duy nhất, tối ưu hóa thời gian xử lý đơn hàng.
- **Kiểm tra tồn kho tức thì:** Tự động cảnh báo và chặn xuất hàng nếu số lượng trong kho không đủ, đảm bảo tính chính xác của dữ liệu.
- **Ghi log tự động:** Mỗi lần xuất kho đều được ghi lại vào lịch sử hoạt động với chi tiết số lượng trước và sau khi thay đổi (Audit Trail).

### 🔒 Bảo mật Đa lớp (Enterprise Grade)

- **Xác thực 2 lớp (2FA):** Tích hợp mã OTP qua ứng dụng xác thực, bảo vệ tài khoản khỏi các truy cập trái phép.
- **Mã PIN bảo mật:** Lớp bảo vệ bổ sung cho các thao tác nhạy cảm như xóa dữ liệu hoặc thay đổi cấu hình hệ thống.
- **Quản lý phiên (Sessions):** Theo dõi danh sách thiết bị đang đăng nhập và hỗ trợ đăng xuất từ xa.
- **Base64 Avatar:** Lưu trữ ảnh đại diện trực tiếp dưới dạng chuỗi Base64 (LONGTEXT), giúp tăng tốc độ tải trang và đơn giản hóa việc sao lưu dữ liệu.

### 📜 Lịch sử hoạt động (Audit Logs)

- Theo dõi chi tiết mọi biến động của hàng hóa: Nhập kho, Xuất kho, Điều chỉnh.
- Nhật ký ghi rõ: **Người thực hiện**, **Sản phẩm**, **Số lượng thay đổi**, và **Thời gian chính xác**.

---

## 🛠️ Công nghệ sử dụng

### Frontend (Modern & Performance)

- **React 19 & Vite:** Sử dụng phiên bản React mới nhất cho hiệu năng vượt trội.
- **Redux Toolkit:** Quản lý state tập trung, đồng nhất cho toàn bộ ứng dụng.
- **Tailwind CSS v4:** Styling hiện đại, responsive hoàn hảo trên mọi thiết bị.
- **Chart.js & Framer Motion:** Hình ảnh hóa dữ liệu sinh động với các hiệu ứng chuyển cảnh mượt mà.

### Backend (Robust & Scalable)

- **Node.js & Express 5:** Framework backend mạnh mẽ, hỗ trợ xử lý bất đồng bộ (async/await) toàn diện.
- **Sequelize ORM:** Quản lý Database chuyên nghiệp, hỗ trợ Migrations và Transactions để bảo vệ tính toàn vẹn của dữ liệu.
- **MySQL:** Hệ quản trị cơ sở dữ liệu quan hệ tin cậy cho dữ liệu doanh nghiệp.
- **JWT & Bcrypt:** Bảo mật phiên làm việc và mã hóa mật khẩu theo tiêu chuẩn công nghiệp.

---

## 🚀 Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống

- Node.js (v18 trở lên)
- MySQL (v8.0 trở lên)

### 2. Cài đặt Backend

```bash
cd backend
npm install
cp .env.example .env # Cấu hình DB_URL và JWT_SECRET trong file .env
npx sequelize-cli db:migrate
npm start
```

### 3. Cài đặt Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Ảnh chụp giao diện

|      Dashboard Thông minh       |                  Quản lý Hàng hóa                  |       Phiếu xuất Hiện đại       |
| :-----------------------------: | :------------------------------------------------: | :-----------------------------: |
| ![Dashboard](./public/home.png) | ![Products](./backend/public/image/banh-mochi.jpg) | ![Export](./public/archive.svg) |

---

## 📞 Liên hệ & Hỗ trợ

Nếu bạn có bất kỳ thắc mắc nào hoặc muốn đóng góp cho dự án, vui lòng liên hệ:

- **Issue Tracker:** [GitHub Issues](https://github.com/yourusername/he-thong-quan-ly-kho/issues)

---

<div align="center">
  <p>Được thực hiện với ❤️ bởi Nhóm 6 — Năm 2026</p>
</div>
