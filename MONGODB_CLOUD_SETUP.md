# Hướng dẫn Setup MongoDB Cloud

## Kiểm tra kết nối hiện tại

### 1. Test kết nối MongoDB
```bash
cd backend
npm run test-db
```

### 2. Chạy seed data với MongoDB Cloud
```bash
cd backend
npm run seed
```

### 3. Test toàn bộ hệ thống
```bash
# Đảm bảo server đang chạy
cd backend
npm run dev

# Trong terminal khác
node test-system.js
```

## Cấu hình MongoDB Cloud

### 1. Connection String hiện tại
```
mongodb+srv://phunguyenva99_db_user:RJsjiHKa0cbEjAk4@cluster0.lahqwg1.mongodb.net/?appName=Cluster0
```

### 2. Kiểm tra các settings cần thiết

#### Network Access
- Đảm bảo IP của bạn được whitelist
- Hoặc cho phép access từ anywhere (0.0.0.0/0) cho development

#### Database User
- Username: `phunguyenva99_db_user`
- Password: `RJsjiHKa0cbEjAk4`
- Roles: `readWrite` trên database `employee_assessment`

#### Database Name
- Database: `employee_assessment`
- Collections sẽ được tạo tự động: `users`, `assessments`, `criteria`

## Troubleshooting

### Lỗi thường gặp:

#### 1. Authentication failed
```
💡 Check username/password in MongoDB Atlas
💡 Ensure user has correct permissions
```

#### 2. Network timeout
```
💡 Check internet connection
💡 Verify IP whitelist in MongoDB Atlas
💡 Try allowing access from anywhere (0.0.0.0/0)
```

#### 3. DNS resolution failed
```
💡 Check cluster URL in connection string
💡 Ensure cluster is running
```

## Cấu trúc Database sau khi seed

### Collections:
1. **users** - Nhân viên và supervisor
2. **criteria** - Tiêu chí đánh giá theo phòng ban
3. **assessments** - Các đánh giá đã thực hiện

### Sample Data:
- 1 supervisor: `manager` / `123456`
- 12 employees từ các phòng ban khác nhau
- Tiêu chí chung + tiêu chí riêng cho từng phòng ban
- Sample assessments cho tất cả nhân viên

## Chạy ứng dụng

### 1. Backend
```bash
cd backend
npm run dev
```
Server sẽ chạy tại: http://localhost:4000

### 2. Frontend
```bash
cd frontend
npm run dev
```
Frontend sẽ chạy tại: http://localhost:5173

### 3. Login
- Username: `manager`
- Password: `123456`

## Monitoring

### Kiểm tra logs
- Backend sẽ hiển thị connection status
- MongoDB Atlas Dashboard để monitor usage
- Browser DevTools để debug frontend

### Performance
- MongoDB Cloud có built-in monitoring
- Có thể setup alerts cho connection issues
- Database size và query performance

## Security Notes

### Production Setup:
1. Thay đổi JWT_SECRET
2. Sử dụng environment-specific connection strings
3. Restrict IP access trong MongoDB Atlas
4. Enable MongoDB authentication logs
5. Regular backup database

### Development:
- Current setup OK cho development
- Có thể allow access từ anywhere
- Sử dụng sample data để test