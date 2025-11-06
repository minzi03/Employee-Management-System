# 🏢 Employee Management System

Hệ thống quản lý nhân viên toàn diện với tính năng đánh giá hiệu suất, được xây dựng bằng React và Node.js.

## ✨ Tính năng chính

- 👥 **Quản lý nhân viên**: Thêm, sửa, xóa, xem thông tin nhân viên
- 📊 **Hệ thống đánh giá**: Đánh giá hiệu suất làm việc theo tiêu chí
- 🎯 **Quản lý tiêu chí**: Tạo và quản lý các tiêu chí đánh giá
- 🔐 **Phân quyền**: Admin, Supervisor, Employee với quyền hạn khác nhau
- 📈 **Dashboard**: Thống kê và biểu đồ phân tích dữ liệu
- 🔒 **Bảo mật**: Xác thực JWT và mã hóa mật khẩu

## 🛠️ Công nghệ sử dụng

**Frontend:**
- React 19.1.1
- React Router DOM 7.9.5
- Recharts 3.3.0 (biểu đồ)
- Vite 7.1.7 (build tool)

**Backend:**
- Node.js + Express 4.19.2
- MongoDB + Mongoose 8.6.0
- JWT 9.0.2 (authentication)
- bcryptjs 2.4.3 (mã hóa mật khẩu)

## 🚀 Cài đặt nhanh

```bash
# 1. Clone repository
git clone https://github.com/minzi03/Employee-Management-System.git
cd Employee-Management-System

# 2. Cài đặt dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Thiết lập environment variables
cp backend/.env.example backend/.env
# Chỉnh sửa file .env với thông tin database

# 4. Khởi chạy hệ thống
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

## 📚 Tài liệu hướng dẫn

- 📖 [Hướng dẫn Backend](./BACKEND_GUIDE.md) - API, Database, Authentication
- 🎨 [Hướng dẫn Frontend](./FRONTEND_GUIDE.md) - React Components, UI, Routing
- ▶️ [Hướng dẫn chạy ứng dụng](./RUN_GUIDE.md) - Setup, Installation, Troubleshooting
- 🗄️ [Thiết lập MongoDB Cloud](./MONGODB_CLOUD_SETUP.md) - Database Cloud Setup
- 📋 [Quản lý tiêu chí đánh giá](./CRITERIA_MANAGEMENT_GUIDE.md) - Assessment Criteria

## 🏗️ Cấu trúc dự án

```
Employee-Management-System/
├── backend/                 # Server Node.js
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── db.js          # Database connection
│   ├── server.js          # Entry point
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── api.js         # API calls
│   ├── index.html
│   └── package.json
└── docs/                  # Documentation
```

## 👥 Vai trò người dùng

- **Admin**: Quản lý toàn bộ hệ thống, nhân viên, tiêu chí
- **Supervisor**: Đánh giá nhân viên, xem báo cáo
- **Employee**: Xem thông tin cá nhân, kết quả đánh giá

## 🔧 Scripts hữu ích

```bash
# Backend
npm run dev          # Chạy server development
npm run start        # Chạy server production
npm run seed         # Tạo dữ liệu mẫu
npm run test-db      # Test kết nối database

# Frontend
npm run dev          # Chạy React development
npm run build        # Build production
npm run preview      # Preview build
```

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra [Hướng dẫn chạy ứng dụng](./RUN_GUIDE.md)
2. Xem [Issues](https://github.com/minzi03/Employee-Management-System/issues)
3. Tạo issue mới nếu cần thiết

## 📄 License

MIT License - xem file [LICENSE](./LICENSE) để biết thêm chi tiết.