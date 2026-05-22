# Smart WMS v3.0.0

<div align="center">
  <h3>He thong quan ly kho thong minh cho nhap - xuat - ton - van hanh noi bo</h3>

  <p>
    <img src="https://img.shields.io/badge/Version-3.0.0-0f766e?style=for-the-badge" alt="Version 3.0.0" />
    <img src="https://img.shields.io/badge/Status-Active-16a34a?style=for-the-badge" alt="Status Active" />
    <img src="https://img.shields.io/badge/Frontend-React_19_+_Vite-2563eb?style=for-the-badge" alt="Frontend React 19 + Vite" />
    <img src="https://img.shields.io/badge/Backend-Node.js_+_Express_5-1f2937?style=for-the-badge" alt="Backend Node.js + Express 5" />
    <img src="https://img.shields.io/badge/Database-MySQL-1d4ed8?style=for-the-badge" alt="Database MySQL" />
  </p>
</div>

## Gioi thieu

`Smart WMS` la he thong quan ly kho full-stack duoc xay dung de giai quyet tron bo bai toan van hanh kho trong doanh nghiep: quan ly san pham, nhap kho, xuat kho, ton kho, don hang, doi tac giao nhan, thong ke va bao mat tai khoan quan tri.

Ban `v3.0.0` danh dau mot dot nang cap lon cua he thong, tap trung vao 3 nhom gia tri:

- Nang cap trai nghiem quan tri va giao dien.
- Tang cuong bao mat va kiem soat phien dang nhap.
- Hoan thien cac cong cu van hanh nhu notifications, settings va backup.

## Muc luc

1. [Tong quan tinh nang](#tong-quan-tinh-nang)
2. [Diem moi trong v300](#diem-moi-trong-v300)
3. [Cong nghe su dung](#cong-nghe-su-dung)
4. [Kien truc he thong](#kien-truc-he-thong)
5. [Cau truc thu muc](#cau-truc-thu-muc)
6. [Cac phan he chinh](#cac-phan-he-chinh)
7. [Bao mat va phan quyen](#bao-mat-va-phan-quyen)
8. [API modules](#api-modules)
9. [Huong dan cai dat](#huong-dan-cai-dat)
10. [Scripts thuong dung](#scripts-thuong-dung)
11. [Quy trinh van hanh de xuat](#quy-trinh-van-hanh-de-xuat)
12. [Ghi chu phat hanh v300](#ghi-chu-phat-hanh-v300)
13. [Dinh huong phat trien](#dinh-huong-phat-trien)

## Tong quan tinh nang

He thong hien dang bao gom cac nang luc chinh sau:

- Quan ly danh muc san pham, thong tin, gia, hinh anh va QR.
- Quan ly nhap kho, xuat kho, ton kho va nhat ky bien dong kho.
- Quan ly don hang, khach hang, nha cung cap va shipper.
- Dashboard thong ke tong hop, doanh thu, canh bao ton kho va canh bao het han.
- Quan ly nguoi dung, phan quyen va thong tin ca nhan.
- Quan ly thong bao noi bo.
- Quan ly cai dat he thong, giao dien, ngon ngu, bao mat va sao luu.

## Diem moi trong v3.0.0

Ban `3.0.0` khong chi la mot ban fix nho, ma la mot dot nang cap he thong kha ro:

### 1. Bao mat tai khoan manh hon

- Them `2FA` bang ma TOTP de dang nhap an toan hon.
- Them `Security PIN` 6 chu so cho luong xac thuc.
- Ho tro doi mat khau trong phan cai dat.
- Ghi nhan va quan ly `sessions` de dang xuat thiet bi tu xa.

### 2. Mo rong module quan tri

- Them man hinh `Settings`.
- Them man hinh `Notifications`.
- Them route va service cho `backup`.
- Them route va service cho `2FA`, `PIN`, `notification`.

### 3. Nang cap giao dien

- Chinh sua `Sidebar`, `Header`, `Dashboard`, `Profile`.
- Cap nhat nhieu component dung chung de giao dien dong bo hon.
- Ho tro theme va ngon ngu.
- Toi uu luong thao tac tren nhieu module nghiep vu.

## Cong nghe su dung

### Frontend

- `React 19`
- `Vite`
- `Redux Toolkit`
- `TanStack Query`
- `React Router`
- `Tailwind CSS`
- `Recharts`
- `React Toastify`
- `Leaflet`
- `Chart.js`

### Backend

- `Node.js`
- `Express 5`
- `Sequelize`
- `JWT`
- `cookie-parser`
- `cors`
- `bcrypt / bcryptjs`
- `speakeasy`
- `qrcode`
- `multer`

### Database

- `MySQL`
- Migration qua `sequelize-cli`

## Kien truc he thong

Du an theo mo hinh tach lop ro rang giua frontend va backend:

### Frontend

- Quan ly route va dieu huong nguoi dung.
- Xu ly giao dien, state, API client va phan quyen hien thi.
- Thuc hien cac luong nhu dashboard, inventory, settings, notifications.

### Backend

- Tiep nhan request qua router.
- Xu ly logic nghiep vu trong controller/service.
- Lam viec voi database thong qua Sequelize model.
- Quan ly auth, token, cookie, session, 2FA va PIN.

### Database

- Luu tru du lieu nghiep vu kho.
- Luu user, roles, sessions, notifications, inventory logs va cac thuc the lien quan.

## Cau truc thu muc

```text
HE-THONG-QUAN-LY-KHO/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controller/
|   |   |-- middleware/
|   |   |-- migrations/
|   |   |-- models/
|   |   |-- routers/
|   |   `-- services/
|   |-- public/
|   |-- backups/
|   |-- .env.example
|   |-- package.json
|   `-- README.md
|-- frontend/
|   |-- src/
|   |   |-- API/
|   |   |-- auth/
|   |   |-- components/
|   |   |-- i18n/
|   |   |-- redux/
|   |   `-- utils/
|   |-- public/
|   |-- .env.example
|   |-- package.json
|   `-- README.md
`-- README.md
```

## Cac phan he chinh

### 1. Dashboard

- Tong hop chi so van hanh.
- Hien thi doanh thu, xu huong va cac canh bao quan trong.

### 2. Products

- Tao, cap nhat, chinh sua, xem danh sach san pham.
- Ho tro nhieu thanh phan giao dien de quan ly du lieu hang hoa.

### 3. Inventory

- Theo doi ton kho.
- Xem audit logs.
- Kiem soat bien dong nhap xuat.

### 4. Import va Export

- Quan ly phieu nhap.
- Quan ly phieu xuat.
- Hien thi chi tiet phieu va thao tac lien quan.

### 5. Orders

- Theo doi don hang.
- Quan ly trang thai xu ly.
- Gan nghiep vu van chuyen va xuat kho.

### 6. Customer / Supplier / Shipper

- Quan ly doi tac trong he thong.
- Ho tro giao dien CRUD va tac vu van hanh.

### 7. Users

- Quan ly nguoi dung.
- Phan quyen theo vai tro.
- Ho tro route rieng cho `admin` va `dev`.

### 8. Notifications

- Lay danh sach thong bao theo user.
- Danh dau da doc.
- Tao va xoa thong bao.

### 9. Settings

- Doi ten he thong.
- Chuyen ngon ngu.
- Chuyen theme.
- Bat/tat thong bao.
- Cai dat 2FA, PIN, doi mat khau.
- Kiem tra ket noi DB.
- Export SQL va backup JSON.

## Bao mat va phan quyen

He thong `v3.0.0` da duoc nang cap manh ve bao mat:

- Xac thuc bang `access token` va `refresh token`.
- `refresh_token` duoc luu bang `httpOnly cookie`.
- Ho tro `2FA` bang Authenticator app.
- Ho tro `PIN 6 chu so`.
- Co kiem soat route phia frontend bang `RequireAuth` va `RoleGuard`.
- Co kiem soat route phia backend bang middleware xac thuc va role.
- Ho tro quan ly session dang nhap va thu hoi session tu xa.

## API modules

Tat ca route backend duoc mount duoi prefix:

```text
/api/v1
```

Danh sach module hien co:

- `/user`
- `/products`
- `/shipper`
- `/orders`
- `/customer`
- `/suppliers`
- `/import-receipt`
- `/import-detail`
- `/export-receipt`
- `/export-detail`
- `/inventory`
- `/stock`
- `/statistics`
- `/notifications`
- `/2fa`
- `/pin`
- `/backup`

## Huong dan cai dat

### Yeu cau moi truong

- `Node.js 18+`
- `MySQL 8+`
- `npm`

### 1. Cai dat backend

```bash
cd backend
npm install
copy .env.example .env
```

Cau hinh `backend/.env`:

```env
PORT=3001
NODE_ENV=development
DB_DEV_USERNAME=root
DB_DEV_PASSWORD=
DB_DEV_NAME=httt
DB_DEV_HOST=127.0.0.1
DB_DEV_DIALECT=mysql
JWT_SECRET=your_secret
```

Chay migration va khoi dong server:

```bash
npx sequelize-cli db:migrate
npm start
```

Mac dinh backend chay tai:

```text
http://localhost:3001
```

### 2. Cai dat frontend

```bash
cd frontend
npm install
copy .env.example .env
```

Cau hinh `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
```

Khoi dong frontend:

```bash
npm run dev
```

Mac dinh frontend chay tai:

```text
http://localhost:5173
```

## Scripts thuong dung

### Backend

```bash
npm start
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:seed:all
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Quy trinh van hanh de xuat

Neu setup moi tu dau, thu tu de xuat la:

1. Tao database MySQL.
2. Cau hinh `backend/.env`.
3. Chay `db:migrate`.
4. Khoi dong backend.
5. Cau hinh `frontend/.env`.
6. Khoi dong frontend.
7. Dang nhap vao he thong va kiem tra dashboard.
8. Vao `Settings` de bat 2FA hoac PIN neu can.

## Ghi chu phat hanh v3.0.0

Ban phat hanh nay bao gom cac cap nhat lon trong codebase:

- Them migrations cho 2FA, PIN, sessions, notification preferences va system name.
- Them models `session` va `notification`.
- Them controller/route/service cho `backup`, `notification`, `pin`, `2fa`.
- Them giao dien `Settings`, `Notifications` va cac modal quan tri lien quan.
- Cap nhat route frontend va cap quyen rieng cho `admin`/`dev`.
- Dong bo version `3.0.0` trong frontend va backend package metadata.

## Dinh huong phat trien

- Bo sung unit test va integration test cho auth flow.
- Toi uu chunk frontend de giam bundle size production.
- Chuan hoa API response va error handling.
- Bo sung CI/CD cho lint, build va migration validation.
- Tiep tuc mo rong dashboard va nghiep vu kho da chi nhanh neu can.

## Tai lieu lien quan

- [README backend](./backend/README.md)
- [README frontend](./frontend/README.md)

## Tac gia

- Repository: `Nguyen-Trung-Tien/HE-THONG-QUAN-LY-KHO`
- Release hien tai: `Smart WMS v3.0.0`
