# Hướng dẫn Tính năng Quản lý Nhân viên

## Tổng quan
Tính năng quản lý nhân viên cho phép supervisor thực hiện các thao tác CRUD (Create, Read, Update, Delete) với nhân viên trong hệ thống.

## Các chức năng đã thêm

### 1. Backend API Endpoints

#### GET /api/employees
- Lấy danh sách tất cả nhân viên
- Chỉ supervisor mới có quyền truy cập

#### GET /api/employees/:id
- Lấy thông tin chi tiết một nhân viên
- Chỉ supervisor mới có quyền truy cập

#### POST /api/employees
- Tạo nhân viên mới
- Chỉ supervisor mới có quyền truy cập
- Yêu cầu: username, password, fullName (bắt buộc)
- Tùy chọn: email, department, position

#### PUT /api/employees/:id
- Cập nhật thông tin nhân viên
- Chỉ supervisor mới có quyền truy cập
- Có thể cập nhật: fullName, email, department, position, password
- Không thể thay đổi username

#### DELETE /api/employees/:id
- Xóa nhân viên
- Chỉ supervisor mới có quyền truy cập

### 2. Frontend Components

#### EmployeeManagement Component
- Giao diện quản lý nhân viên hoàn chỉnh
- Bảng hiển thị danh sách nhân viên
- Modal form để thêm/sửa nhân viên
- Xác nhận trước khi xóa

#### EmployeeManagementPage
- Trang wrapper với Navbar
- Route: `/employee-management`

### 3. Navigation
- Thêm link "Quản lý Nhân viên" vào Navbar cho supervisor
- Tích hợp vào routing system

## Cách sử dụng

### Đối với Supervisor:

1. **Truy cập trang quản lý nhân viên:**
   - Đăng nhập với tài khoản supervisor
   - Click vào "Quản lý Nhân viên" trên thanh navigation

2. **Thêm nhân viên mới:**
   - Click nút "+ Thêm Nhân viên"
   - Điền thông tin bắt buộc: Tên đăng nhập, Mật khẩu, Họ tên
   - Điền thông tin tùy chọn: Email, Phòng ban, Chức vụ
   - Click "Tạo mới"

3. **Chỉnh sửa nhân viên:**
   - Click nút "Sửa" ở hàng nhân viên cần chỉnh sửa
   - Cập nhật thông tin (không thể thay đổi tên đăng nhập)
   - Để trống mật khẩu nếu không muốn thay đổi
   - Click "Cập nhật"

4. **Xóa nhân viên:**
   - Click nút "Xóa" ở hàng nhân viên cần xóa
   - Xác nhận trong dialog popup

## Validation và Bảo mật

### Backend:
- Kiểm tra quyền truy cập (chỉ supervisor)
- Validate dữ liệu đầu vào
- Kiểm tra trùng lặp username và email
- Hash mật khẩu với bcrypt
- Xử lý lỗi và trả về thông báo phù hợp

### Frontend:
- Form validation
- Xác nhận trước khi xóa
- Hiển thị thông báo lỗi/thành công
- Disable username field khi chỉnh sửa

## Cấu trúc File

```
backend/
├── src/
│   └── routes/
│       └── employees.js (đã cập nhật với CRUD operations)

frontend/
├── src/
│   ├── components/
│   │   ├── EmployeeManagement.jsx (component chính)
│   │   └── Navbar.jsx (đã thêm navigation links)
│   ├── pages/
│   │   └── EmployeeManagementPage.jsx (trang wrapper)
│   ├── api.js (đã thêm employee API functions)
│   └── main.jsx (đã thêm route mới)
```

## Chạy ứng dụng

1. **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Truy cập:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## Lưu ý
- Tính năng này chỉ dành cho supervisor
- Nhân viên bị xóa sẽ không thể đăng nhập lại
- Nên backup dữ liệu trước khi xóa nhân viên
- Mật khẩu được mã hóa an toàn với bcrypt