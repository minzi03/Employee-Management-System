# 🚀 Employee Assessment System - Setup Guide

## 📋 Hướng dẫn chạy dự án để báo cáo

### 🔧 Yêu cầu hệ thống
- **Node.js** version 16+ 
- **npm** version 8+
- **MongoDB** (sử dụng MongoDB Atlas Cloud)
- **Windows** (script .bat)

### ⚡ Cách 1: Chạy tự động (Khuyến nghị)

1. **Mở Command Prompt** với quyền Administrator
2. **Navigate** đến thư mục dự án:
   ```cmd
   cd D:\cv\scrum\scrum-master
   ```
3. **Chạy script setup**:
   ```cmd
   setup-and-run.bat
   ```
4. **Đợi** 10-15 giây để servers khởi động
5. **Mở browser** và truy cập: http://localhost:5173

### 🔧 Cách 2: Chạy thủ công

#### Bước 1: Dọn dẹp
```cmd
# Dừng tất cả Node.js processes
taskkill /f /im node.exe

# Xóa cache
npm cache clean --force

# Xóa node_modules
rmdir /s /q backend\node_modules
rmdir /s /q frontend\node_modules
del backend\package-lock.json
del frontend\package-lock.json
```

#### Bước 2: Cài đặt dependencies
```cmd
# Backend
cd backend
npm install
cd ..

# Frontend  
cd frontend
npm install
cd ..
```

#### Bước 3: Khởi động servers
```cmd
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend (mở terminal mới)
cd frontend
npm run dev
```

## 🌐 URLs và Thông tin truy cập

### 🔗 Application URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Database**: MongoDB Atlas Cloud

### 📱 Các trang chính
| Trang | URL | Mô tả |
|-------|-----|-------|
| Login | http://localhost:5173/login | Đăng nhập hệ thống |
| Dashboard | http://localhost:5173/dashboard | Trang chủ sau đăng nhập |
| Quản lý Nhân viên | http://localhost:5173/employee-management | Quản lý danh sách nhân viên |
| Chi tiết Nhân viên | http://localhost:5173/employee-detail | Xem chi tiết và đánh giá |
| Quản lý Tiêu chí | http://localhost:5173/criteria-admin | Quản lý tiêu chí đánh giá |

### 👤 Tài khoản mặc định
| Role | Username | Password | Quyền |
|------|----------|----------|-------|
| Supervisor | `supervisor` | `password123` | Quản lý nhân viên, xem báo cáo |
| Employee | `employee1` | `password123` | Xem đánh giá cá nhân |

## 📄 Tính năng xuất PDF

### 🏢 Danh sách Nhân viên (Employee Management)
- **📄 Xuất PDF**: Danh sách dạng bảng đơn giản
- **📊 Báo cáo Chi tiết**: Báo cáo với thống kê phòng ban

### 👤 Báo cáo Nhân viên (Employee Detail)  
- **📋 Báo cáo Cá nhân**: Chi tiết đánh giá của từng nhân viên
- **📈 Lịch sử Đánh giá**: Theo dõi tiến độ qua các kỳ

### ⚙️ Quản lý Tiêu chí (Criteria Admin)
- **📊 Báo cáo Tiêu chí**: Thống kê các tiêu chí đánh giá
- **📋 Danh sách Tiêu chí**: Xuất danh sách tiêu chí active/inactive

## 🧪 Demo Flow cho Báo cáo

### 1. Đăng nhập
```
URL: http://localhost:5173/login
Username: supervisor
Password: password123
```

### 2. Quản lý Nhân viên
```
URL: http://localhost:5173/employee-management
- Xem danh sách nhân viên
- Thêm/sửa/xóa nhân viên  
- Xuất PDF danh sách
- Xuất báo cáo chi tiết
```

### 3. Chi tiết Nhân viên
```
URL: http://localhost:5173/employee-detail
- Chọn nhân viên từ dropdown
- Xem lịch sử đánh giá
- Xuất báo cáo cá nhân
```

### 4. Quản lý Tiêu chí
```
URL: http://localhost:5173/criteria-admin  
- Quản lý tiêu chí đánh giá
- Xuất báo cáo tiêu chí
```

## 🔧 Troubleshooting

### ❌ Lỗi thường gặp

#### Port đã được sử dụng
```cmd
# Kiểm tra port đang sử dụng
netstat -ano | findstr :5173
netstat -ano | findstr :4000

# Dừng process
taskkill /f /pid <PID>
```

#### Lỗi MongoDB connection
- Kiểm tra file `backend/.env`
- Đảm bảo MongoDB Atlas connection string đúng
- Kiểm tra network connection

#### Lỗi dependencies
```cmd
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install
```

### 🆘 Liên hệ hỗ trợ
- Kiểm tra console browser (F12) để xem lỗi frontend
- Kiểm tra terminal backend để xem lỗi API
- Đảm bảo cả 2 servers đều chạy

## 📊 Cấu trúc Project

```
employee-assessment-system/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── db.js           # MongoDB connection
│   │   └── seed.js         # Sample data
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utilities (PDF export)
│   │   └── main.jsx        # Entry point
│   └── package.json
├── setup-and-run.bat      # Auto setup script
└── README-SETUP.md        # This file
```

## 🎯 Mục tiêu Demo

1. **Hiển thị giao diện** responsive và thân thiện
2. **Quản lý nhân viên** đầy đủ (CRUD)
3. **Hệ thống đánh giá** với nhiều tiêu chí
4. **Xuất báo cáo PDF** với tiếng Việt
5. **Dashboard** với thống kê trực quan
6. **Phân quyền** supervisor/employee

---

**🚀 Chúc bạn demo thành công!**