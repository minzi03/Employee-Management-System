# 📖 Hướng dẫn Backend - Employee Management System

## 🏗️ Tổng quan kiến trúc

Backend được xây dựng theo mô hình RESTful API với Node.js và Express, sử dụng MongoDB làm cơ sở dữ liệu.

### Cấu trúc thư mục

```
backend/
├── src/
│   ├── models/           # Mongoose models
│   │   ├── User.js      # Model người dùng
│   │   ├── Employee.js  # Model nhân viên
│   │   ├── Assessment.js # Model đánh giá
│   │   └── Criteria.js  # Model tiêu chí
│   ├── routes/          # API routes
│   │   ├── auth.js      # Authentication routes
│   │   ├── employees.js # Employee management
│   │   ├── assessments.js # Assessment routes
│   │   └── criteria.js  # Criteria management
│   ├── middleware/      # Express middleware
│   │   └── auth.js      # JWT authentication
│   ├── db.js           # Database connection
│   └── seed.js         # Database seeding
├── server.js           # Entry point
├── test-connection.js  # Database test
├── .env               # Environment variables
└── package.json       # Dependencies
```

## 🔧 Cài đặt và thiết lập

### 1. Cài đặt dependencies

```bash
cd backend
npm install
```

### 2. Thiết lập biến môi trường

Tạo file `.env` trong thư mục backend:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/employee_assessment
# Hoặc MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee_assessment

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3. Khởi tạo dữ liệu mẫu

```bash
npm run seed
```

## 🗄️ Models (Mongoose Schemas)

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (admin/supervisor/employee),
  createdAt: Date,
  updatedAt: Date
}
```

### Employee Model
```javascript
{
  employeeId: String (unique),
  name: String,
  email: String,
  department: String,
  position: String,
  supervisor: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Assessment Model
```javascript
{
  employee: ObjectId (ref: Employee),
  assessor: ObjectId (ref: User),
  period: String,
  scores: [{
    criteria: ObjectId (ref: Criteria),
    score: Number (1-5),
    comment: String
  }],
  overallScore: Number,
  status: String (draft/completed),
  createdAt: Date,
  updatedAt: Date
}
```

### Criteria Model
```javascript
{
  name: String,
  description: String,
  category: String,
  weight: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛣️ API Routes

### Authentication Routes (`/api/auth`)

```javascript
POST /api/auth/register    # Đăng ký tài khoản
POST /api/auth/login       # Đăng nhập
GET  /api/auth/profile     # Lấy thông tin profile
PUT  /api/auth/profile     # Cập nhật profile
```

### Employee Routes (`/api/employees`)

```javascript
GET    /api/employees           # Lấy danh sách nhân viên
POST   /api/employees           # Tạo nhân viên mới
GET    /api/employees/:id       # Lấy thông tin nhân viên
PUT    /api/employees/:id       # Cập nhật nhân viên
DELETE /api/employees/:id       # Xóa nhân viên
GET    /api/employees/:id/assessments # Lấy đánh giá của nhân viên
```

### Assessment Routes (`/api/assessments`)

```javascript
GET    /api/assessments         # Lấy danh sách đánh giá
POST   /api/assessments         # Tạo đánh giá mới
GET    /api/assessments/:id     # Lấy chi tiết đánh giá
PUT    /api/assessments/:id     # Cập nhật đánh giá
DELETE /api/assessments/:id     # Xóa đánh giá
POST   /api/assessments/:id/submit # Nộp đánh giá
```

### Criteria Routes (`/api/criteria`)

```javascript
GET    /api/criteria            # Lấy danh sách tiêu chí
POST   /api/criteria            # Tạo tiêu chí mới
GET    /api/criteria/:id        # Lấy chi tiết tiêu chí
PUT    /api/criteria/:id        # Cập nhật tiêu chí
DELETE /api/criteria/:id        # Xóa tiêu chí
```

## 🔐 Authentication & Authorization

### JWT Token
- Sử dụng JWT để xác thực người dùng
- Token được gửi trong header: `Authorization: Bearer <token>`
- Token có thời hạn 24 giờ

### Middleware xác thực
```javascript
// middleware/auth.js
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

### Phân quyền theo role
- **Admin**: Toàn quyền truy cập
- **Supervisor**: Quản lý nhân viên và đánh giá
- **Employee**: Chỉ xem thông tin cá nhân

## 🗃️ Database Operations

### Kết nối MongoDB
```javascript
// src/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
```

### Seeding dữ liệu
```bash
npm run seed  # Tạo dữ liệu mẫu
```

## 🔧 Scripts và Commands

```bash
# Development
npm run dev          # Chạy server với nodemon
npm start           # Chạy server production

# Database
npm run seed        # Tạo dữ liệu mẫu
npm run test-db     # Test kết nối database

# Testing
npm test           # Chạy tests (nếu có)
```

## 🐛 Debugging và Logging

### Morgan Logging
Server sử dụng Morgan để log HTTP requests:
```javascript
app.use(morgan('dev'));
```

### Error Handling
Global error handler:
```javascript
app.use((err, req, res, next) => {
  console.error('🔥 Uncaught error:', err);
  res.status(err.status || 500)
     .json({ message: err.message || 'Internal Server Error' });
});
```

## 📊 Performance & Security

### Security Features
- Password hashing với bcryptjs
- JWT token authentication
- CORS configuration
- Request size limiting
- Input validation

### Performance
- MongoDB indexing
- Efficient queries với populate
- Response caching (có thể thêm)

## 🚀 Deployment

### Environment Variables cho Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-production-secret
PORT=4000
CORS_ORIGIN=https://yourdomain.com
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "employee-api"
pm2 startup
pm2 save
```

## 🔍 Troubleshooting

### Lỗi thường gặp

1. **MongoDB connection failed**
   - Kiểm tra MONGODB_URI trong .env
   - Đảm bảo MongoDB service đang chạy

2. **JWT errors**
   - Kiểm tra JWT_SECRET trong .env
   - Verify token format trong request

3. **CORS errors**
   - Kiểm tra CORS_ORIGIN setting
   - Đảm bảo frontend URL đúng

### Debug commands
```bash
# Test database connection
npm run test-db

# Check server health
curl http://localhost:4000/

# Test API endpoints
curl -X GET http://localhost:4000/api/employees \
  -H "Authorization: Bearer <your-token>"
```