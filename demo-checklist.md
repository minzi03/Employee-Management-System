# 📋 Demo Checklist - Employee Assessment System

## 🎯 Chuẩn bị Demo

### ✅ Pre-Demo Setup
- [ ] Chạy `setup-and-run.bat` hoặc `quick-start.bat`
- [ ] Kiểm tra http://localhost:5173 hoạt động
- [ ] Kiểm tra http://localhost:4000 API hoạt động
- [ ] Test login với `supervisor/password123`
- [ ] Đảm bảo có dữ liệu mẫu trong database

### 🎬 Demo Flow (15-20 phút)

#### 1. Giới thiệu Hệ thống (2 phút)
- [ ] Mở trang chủ http://localhost:5173
- [ ] Giải thích mục đích: Hệ thống đánh giá nhân viên
- [ ] Highlight: Xuất PDF tiếng Việt, quản lý đa cấp

#### 2. Đăng nhập và Dashboard (3 phút)
- [ ] Login: `supervisor` / `password123`
- [ ] Hiển thị dashboard với thống kê
- [ ] Giải thích các menu: Nhân viên, Đánh giá, Tiêu chí

#### 3. Quản lý Nhân viên (5 phút)
- [ ] Vào http://localhost:5173/employee-management
- [ ] **Demo chính**: Xuất PDF danh sách nhân viên
  - [ ] Click "📄 Xuất PDF" → Tải file PDF đơn giản
  - [ ] Click "📊 Báo cáo Chi tiết" → Tải báo cáo với thống kê
- [ ] Mở PDF để show tiếng Việt hiển thị đúng
- [ ] Demo thêm/sửa nhân viên (nếu có thời gian)

#### 4. Chi tiết Nhân viên và Đánh giá (4 phút)  
- [ ] Vào http://localhost:5173/employee-detail
- [ ] Chọn nhân viên từ dropdown
- [ ] Hiển thị lịch sử đánh giá
- [ ] **Demo**: Xuất báo cáo cá nhân PDF
- [ ] Show PDF với đầy đủ thông tin đánh giá

#### 5. Quản lý Tiêu chí (3 phút)
- [ ] Vào http://localhost:5173/criteria-admin  
- [ ] Hiển thị danh sách tiêu chí đánh giá
- [ ] **Demo**: Xuất báo cáo tiêu chí PDF
- [ ] Giải thích cách quản lý tiêu chí

#### 6. Tổng kết (3 phút)
- [ ] Highlight các tính năng chính
- [ ] Nhấn mạnh PDF tiếng Việt
- [ ] Q&A

## 🎯 Key Demo Points

### 🌟 Điểm nổi bật cần nhấn mạnh:
1. **PDF Export tiếng Việt** - Hiển thị đúng dấu, font đẹp
2. **Responsive Design** - Giao diện đẹp trên mọi thiết bị  
3. **Quản lý đa cấp** - Supervisor vs Employee roles
4. **Thống kê trực quan** - Charts và báo cáo
5. **CRUD hoàn chỉnh** - Thêm/sửa/xóa dữ liệu

### 📄 PDF Features để Demo:
- ✅ **Danh sách nhân viên** (bảng + thống kê phòng ban)
- ✅ **Báo cáo cá nhân** (lịch sử đánh giá chi tiết)  
- ✅ **Báo cáo tiêu chí** (quản lý tiêu chí đánh giá)
- ✅ **Font tiếng Việt** (hiển thị đúng dấu)
- ✅ **Layout chuyên nghiệp** (header, footer, phân trang)

## 🔧 Backup Plans

### ❌ Nếu có lỗi:
1. **Port conflict**: Dùng http://localhost:5174 thay vì 5173
2. **PDF không tải**: Refresh page và thử lại
3. **Database lỗi**: Restart backend server
4. **Frontend lỗi**: Hard refresh (Ctrl+F5)

### 🆘 Emergency Commands:
```cmd
# Restart nhanh
taskkill /f /im node.exe
quick-start.bat

# Kiểm tra ports
netstat -ano | findstr :5173
netstat -ano | findstr :4000
```

## 📱 Demo URLs Chính

| Tính năng | URL | Mục đích Demo |
|-----------|-----|---------------|
| Login | http://localhost:5173/login | Đăng nhập hệ thống |
| Dashboard | http://localhost:5173/dashboard | Tổng quan thống kê |
| **Quản lý NV** | http://localhost:5173/employee-management | **PDF Export chính** |
| Chi tiết NV | http://localhost:5173/employee-detail | Báo cáo cá nhân |
| Tiêu chí | http://localhost:5173/criteria-admin | Quản lý tiêu chí |

## 🎤 Script Demo (Tham khảo)

### Mở đầu:
*"Hôm nay tôi sẽ demo hệ thống đánh giá nhân viên với tính năng xuất PDF tiếng Việt. Đây là một ứng dụng web full-stack với React frontend và Node.js backend."*

### Khi demo PDF:
*"Điểm nổi bật của hệ thống là khả năng xuất báo cáo PDF với font tiếng Việt hiển thị chính xác. Chúng ta có 2 loại báo cáo: đơn giản và chi tiết với thống kê."*

### Kết thúc:
*"Hệ thống đã sẵn sàng triển khai với đầy đủ tính năng quản lý nhân viên và xuất báo cáo chuyên nghiệp."*

---

**🎯 Mục tiêu: Thể hiện kỹ năng fullstack và khả năng xử lý PDF tiếng Việt**