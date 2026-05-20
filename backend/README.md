# 🚀 Backend API - XD_HTTQL

Server API mạnh mẽ cho hệ thống quản lý kho, xây dựng trên nền tảng **Node.js** và **Express.js**, quản lý dữ liệu thông qua **Sequelize ORM**.

---

## 🛠️ Công nghệ sử dụng
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Token (JWT) & Cookies
- **Security:** Bcrypt (Mã hóa mật khẩu), CORS, Cookie-parser
- **File Upload:** Multer

---

## 📁 Cấu trúc thư mục
```text
backend/
├── src/
│   ├── config/      # Cấu hình Database & Environment
│   ├── controller/  # Xử lý Request/Response và Logic điều hướng
│   ├── middleware/  # Kiểm soát truy cập, upload file
│   ├── migrations/  # Quản lý cấu trúc bảng database
│   ├── models/      # Định nghĩa Schema (Sequelize Models)
│   ├── routers/     # Định nghĩa các Endpoint API
│   ├── seeders/     # Dữ liệu mẫu (Demo Data)
│   ├── services/    # Xử lý nghiệp vụ (Business Logic) chuyên sâu
│   └── utils/       # Các hàm tiện ích dùng chung
├── public/          # Tài nguyên tĩnh (Hình ảnh sản phẩm)
├── .env.example     # File mẫu cấu hình môi trường
└── package.json     # Quản lý thư viện và script
```

---

## ⚙️ Cài đặt môi trường

1. Tạo file `.env` tại thư mục gốc của `/backend`.
2. Sao chép nội dung từ `.env.example` và điều chỉnh các thông số sau:
   - `PORT`: Cổng chạy server (mặc định 3001).
   - `DB_DEV_NAME`: Tên database của bạn.
   - `DB_DEV_USERNAME` & `DB_DEV_PASSWORD`: Tài khoản MySQL.
   - `JWT_SECRET`: Chuỗi bảo mật để ký token.

---

## 💾 Quản lý Database

Sử dụng **Sequelize CLI** để quản lý database:

- **Tạo bảng:** `npx sequelize-cli db:migrate`
- **Tạo dữ liệu mẫu:** `npx sequelize-cli db:seed:all`
- **Reset database:** `npx sequelize-cli db:migrate:undo:all`

---

## 🛣️ API Endpoints (v1)

Tất cả các route đều bắt đầu bằng `/api/v1`

| Tài nguyên | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **User** | `/user` | Quản lý đăng nhập, đăng ký, thông tin người dùng |
| **Products** | `/products` | CRUD sản phẩm, quản lý hình ảnh |
| **Orders** | `/orders` | Quản lý đơn hàng và trạng thái đơn |
| **Customer** | `/customer` | Quản lý thông tin khách hàng |
| **Supplier** | `/suppliers` | Quản lý nhà cung cấp |
| **Shipper** | `/shipper` | Quản lý đối tác giao hàng |
| **Stock** | `/stock` | Quản lý tồn kho và các lô hàng (Batches) |
| **Import** | `/import-receipt` | Phiếu nhập kho và chi tiết nhập |
| **Export** | `/export-receipt` | Phiếu xuất kho và chi tiết xuất |
| **Inventory** | `/inventory` | Nhật ký thay đổi kho |
| **Statistics** | `/statistics` | Báo cáo doanh thu và tăng trưởng |

---

## 🛡️ Xác thực & Bảo mật
- **JWT:** Token được lưu trữ trong **HTTP-Only Cookie** để ngăn chặn tấn công XSS.
- **Middleware:** Kiểm tra quyền truy cập trước khi thực hiện các tác vụ quan trọng (Create, Update, Delete).

---

## 🏃 Khởi động
```bash
# Cài đặt dependencies
npm install

# Chạy ở chế độ phát triển (auto reload với nodemon)
npm start
```
