# ▶️ Hướng dẫn chạy ứng dụng - Employee Management System

## 🚀 Khởi chạy nhanh (Quick Start)

### Bước 1: Clone repository
```bash
git clone https://github.com/minzi03/Employee-Management-System.git
cd Employee-Management-System
```

### Bước 2: Cài đặt dependencies
```bash
# Cài đặt backend dependencies
cd backend
npm install

# Cài đặt frontend dependencies
cd ../frontend
npm install
```

### Bước 3: Thiết lập database
```bash
# Quay về thư mục backend
cd ../backend

# Tạo file .env (copy từ .env.example nếu có)
# Hoặc tạo file .env với nội dung sau:
```

Tạo file `backend/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/employee_assessment

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production

# Server
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Bước 4: Khởi tạo dữ liệu mẫu
```bash
# Trong thư mục backend
npm run seed
```

### Bước 5: Chạy ứng dụng
Mở 2 terminal:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Bước 6: Truy cập ứng dụng
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## 🗄️ Thiết lập Database

### Option 1: MongoDB Local
```bash
# Cài đặt MongoDB Community Server
# Windows: Download từ mongodb.com
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Khởi động MongoDB service
# Windows: Tự động khởi động sau khi cài
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod

# Kiểm tra kết nối
cd backend
npm run test-db
```

### Option 2: MongoDB Atlas (Cloud)
1. Tạo tài khoản tại https://cloud.mongodb.com
2. Tạo cluster mới (free tier)
3. Tạo database user
4. Whitelist IP address (0.0.0.0/0 cho development)
5. Lấy connection string
6. Cập nhật MONGODB_URI trong .env:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee_assessment
```

## 👤 Tài khoản mặc định

Sau khi chạy `npm run seed`, hệ thống sẽ tạo các tài khoản mặc định:

### Admin Account
- **Username:** admin
- **Password:** admin123
- **Role:** Admin
- **Quyền:** Quản lý toàn bộ hệ thống

### Supervisor Account
- **Username:** supervisor
- **Password:** supervisor123
- **Role:** Supervisor
- **Quyền:** Quản lý nhân viên và đánh giá

### Employee Account
- **Username:** employee
- **Password:** employee123
- **Role:** Employee
- **Quyền:** Xem thông tin cá nhân

## 🔧 Scripts hữu ích

### Backend Scripts
```bash
cd backend

# Development với auto-reload
npm run dev

# Production mode
npm start

# Tạo dữ liệu mẫu
npm run seed

# Test kết nối database
npm run test-db

# Kiểm tra health của server
curl http://localhost:4000/
```

### Frontend Scripts
```bash
cd frontend

# Development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Truy cập các tính năng

### 1. Đăng nhập
- Truy cập: http://localhost:5173/login
- Sử dụng tài khoản mặc định ở trên

### 2. Dashboard Admin
- URL: http://localhost:5173/dashboard
- Tính năng:
  - Thống kê tổng quan
  - Biểu đồ phân tích
  - Quản lý nhân viên
  - Quản lý tiêu chí đánh giá

### 3. Dashboard Supervisor
- URL: http://localhost:5173/supervisor-dashboard
- Tính năng:
  - Xem nhân viên được quản lý
  - Tạo và quản lý đánh giá
  - Thống kê team

### 4. Quản lý nhân viên
- URL: http://localhost:5173/employees
- Tính năng:
  - Thêm nhân viên mới
  - Chỉnh sửa thông tin
  - Xóa nhân viên
  - Xem lịch sử đánh giá

### 5. Quản lý tiêu chí
- URL: http://localhost:5173/criteria
- Tính năng:
  - Tạo tiêu chí đánh giá
  - Phân loại tiêu chí
  - Thiết lập trọng số

## 🔍 Kiểm tra hệ thống

### 1. Test Backend API
```bash
# Health check
curl http://localhost:4000/

# Test login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test protected route (cần token)
curl -X GET http://localhost:4000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Test Frontend
- Mở browser tại http://localhost:5173
- Kiểm tra console cho errors
- Test đăng nhập với tài khoản mặc định
- Kiểm tra navigation giữa các trang

### 3. Test Database
```bash
cd backend
npm run test-db
```

## 🐛 Troubleshooting

### Lỗi thường gặp

#### 1. "Cannot connect to MongoDB"
**Nguyên nhân:** MongoDB service không chạy hoặc connection string sai

**Giải pháp:**
```bash
# Kiểm tra MongoDB service
# Windows: Services.msc -> MongoDB Server
# macOS: brew services list | grep mongodb
# Ubuntu: sudo systemctl status mongod

# Kiểm tra connection string trong .env
# Đảm bảo MONGODB_URI đúng format
```

#### 2. "Port 4000 already in use"
**Nguyên nhân:** Port đã được sử dụng

**Giải pháp:**
```bash
# Tìm process đang sử dụng port
# Windows: netstat -ano | findstr :4000
# macOS/Linux: lsof -i :4000

# Kill process hoặc đổi port trong .env
PORT=4001
```

#### 3. "CORS error"
**Nguyên nhân:** Frontend và backend chạy khác domain/port

**Giải pháp:**
```bash
# Kiểm tra CORS_ORIGIN trong backend/.env
CORS_ORIGIN=http://localhost:5173

# Hoặc kiểm tra API_BASE_URL trong frontend/src/api.js
```

#### 4. "JWT token invalid"
**Nguyên nhân:** Token hết hạn hoặc JWT_SECRET sai

**Giải pháp:**
```bash
# Xóa token cũ
localStorage.removeItem('token')

# Đăng nhập lại
# Kiểm tra JWT_SECRET trong .env
```

#### 5. "Module not found"
**Nguyên nhân:** Dependencies chưa được cài đặt

**Giải pháp:**
```bash
# Cài lại dependencies
cd backend && npm install
cd ../frontend && npm install

# Xóa node_modules và cài lại nếu cần
rm -rf node_modules package-lock.json
npm install
```

### Debug Commands

```bash
# Kiểm tra logs backend
cd backend
npm run dev
# Xem console output

# Kiểm tra logs frontend
cd frontend
npm run dev
# Mở browser console (F12)

# Kiểm tra database
cd backend
npm run test-db

# Kiểm tra network requests
# Mở browser DevTools -> Network tab
```

## 📊 Monitoring và Logs

### Backend Logs
```bash
# Development logs với Morgan
npm run dev
# Sẽ hiển thị HTTP requests trong console

# Production logs
npm start
# Logs được ghi vào console
```

### Frontend Logs
```bash
# Browser console (F12)
# Kiểm tra errors, warnings, API calls

# Network tab
# Kiểm tra API requests/responses
```

## 🚀 Production Deployment

### Backend Production
```bash
# Build và chạy
cd backend
npm start

# Hoặc sử dụng PM2
npm install -g pm2
pm2 start server.js --name "employee-api"
```

### Frontend Production
```bash
cd frontend
npm run build
# Serve từ thư mục dist/

# Hoặc sử dụng serve
npm install -g serve
serve -s dist -l 3000
```

### Environment Variables Production
```env
# backend/.env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-production-secret
PORT=4000
CORS_ORIGIN=https://yourdomain.com
```

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong console
2. Xem phần Troubleshooting ở trên
3. Kiểm tra GitHub Issues
4. Tạo issue mới với thông tin chi tiết về lỗi