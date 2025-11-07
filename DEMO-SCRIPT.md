# 🎤 DEMO SCRIPT - Employee Assessment System

## 📋 Thông tin cơ bản
- **Thời gian demo**: 15-20 phút
- **Công nghệ**: React + Node.js + MongoDB + PDF Export
- **Tính năng chính**: Quản lý nhân viên + Xuất PDF tiếng Việt

---

## 🎬 DEMO FLOW SCRIPT

### 🚀 1. MỞ ĐẦU (2 phút)

**"Chào mọi người, hôm nay tôi sẽ demo hệ thống đánh giá nhân viên - một ứng dụng web full-stack được xây dựng bằng React và Node.js."**

#### Giới thiệu hệ thống:
- **Mục đích**: Quản lý và đánh giá hiệu suất nhân viên trong doanh nghiệp
- **Điểm nổi bật**: Xuất báo cáo PDF với font tiếng Việt hiển thị chính xác
- **Tech stack**: React 19 + Node.js + MongoDB Atlas + jsPDF

**"Hệ thống này giải quyết bài toán quản lý nhân sự và tạo báo cáo chuyên nghiệp cho các doanh nghiệp Việt Nam."**

---

### 🔐 2. ĐĂNG NHẬP VÀ DASHBOARD (3 phút)

#### Truy cập: http://localhost:5173/login

**"Đầu tiên, chúng ta sẽ đăng nhập vào hệ thống với tài khoản supervisor."**

```
Username: supervisor
Password: password123
```

#### Sau khi đăng nhập thành công:

**"Đây là dashboard tổng quan của hệ thống. Chúng ta có thể thấy:"**

- **Thống kê tổng quan**: Số lượng nhân viên, đánh giá, tiêu chí
- **Biểu đồ trực quan**: Hiển thị dữ liệu bằng charts
- **Menu điều hướng**: Các chức năng chính của hệ thống
- **Phân quyền**: Supervisor có quyền truy cập đầy đủ

**"Giao diện được thiết kế responsive, hoạt động tốt trên mọi thiết bị."**

---

### 👥 3. QUẢN LÝ NHÂN VIÊN - DEMO CHÍNH (5 phút)

#### Truy cập: http://localhost:5173/employee-management

**"Bây giờ chúng ta sẽ vào phần quan trọng nhất - quản lý nhân viên và xuất PDF."**

#### Hiển thị danh sách nhân viên:
**"Đây là danh sách tất cả nhân viên trong hệ thống với đầy đủ thông tin:"**
- Tên đăng nhập, họ tên, email
- Phòng ban, chức vụ
- Thao tác sửa/xóa

#### DEMO PDF EXPORT - ĐIỂM CHÍNH:

**"Tính năng nổi bật của hệ thống là xuất báo cáo PDF với 2 định dạng:"**

##### 📄 Xuất PDF Đơn giản:
- **Click nút "📄 Xuất PDF"**
- **"Đây là báo cáo dạng bảng đơn giản với thông tin cơ bản của nhân viên"**
- **Mở file PDF vừa tải**: 
  - "Như các bạn thấy, font tiếng Việt hiển thị hoàn toàn chính xác"
  - "Có header, footer chuyên nghiệp"
  - "Thống kê tổng quan và phân bổ theo phòng ban"

##### 📊 Báo cáo Chi tiết:
- **Click nút "📊 Báo cáo Chi tiết"**
- **"Đây là báo cáo chi tiết với thống kê và phân tích sâu"**
- **Mở file PDF**:
  - "Báo cáo này bao gồm thống kê phần trăm, biểu đồ phòng ban"
  - "Thông tin chi tiết từng nhân viên dạng card"
  - "Layout chuyên nghiệp, phân trang tự động"

**"Đây là điểm mạnh của hệ thống - xử lý font tiếng Việt trong PDF một cách hoàn hảo."**

#### Demo thêm nhân viên (nếu có thời gian):
- **Click "➕ Thêm Nhân viên"**
- **"Giao diện modal hiện đại, validation đầy đủ"**
- Điền thông tin mẫu và lưu

---

### 📊 4. CHI TIẾT NHÂN VIÊN VÀ ĐÁNH GIÁ (4 phút)

#### Truy cập: http://localhost:5173/employee-detail

**"Tiếp theo, chúng ta sẽ xem chi tiết đánh giá của từng nhân viên."**

#### Chọn nhân viên:
- **Chọn nhân viên từ dropdown**
- **"Hệ thống hiển thị đầy đủ thông tin cá nhân và lịch sử đánh giá"**

#### Hiển thị thông tin:
**"Chúng ta có thể thấy:"**
- Thông tin cá nhân chi tiết
- Lịch sử các kỳ đánh giá
- Điểm số và nhận xét từng kỳ
- Biểu đồ tiến độ (nếu có)

#### Demo xuất báo cáo cá nhân:
- **Click nút xuất PDF**
- **Mở file PDF**:
  - **"Báo cáo cá nhân này bao gồm toàn bộ lịch sử đánh giá"**
  - **"Thống kê điểm trung bình, xu hướng cải thiện"**
  - **"Nhận xét và mục tiêu cho kỳ tới"**

---

### ⚙️ 5. QUẢN LÝ TIÊU CHÍ (3 phút)

#### Truy cập: http://localhost:5173/criteria-admin

**"Cuối cùng, chúng ta sẽ xem phần quản lý tiêu chí đánh giá."**

#### Hiển thị danh sách tiêu chí:
**"Đây là nơi quản lý các tiêu chí đánh giá nhân viên:"**
- Tên tiêu chí, mã code, version
- Trọng số, phòng ban áp dụng
- Trạng thái active/inactive

#### Demo xuất báo cáo tiêu chí:
- **Click xuất PDF**
- **Mở file PDF**:
  - **"Báo cáo này thống kê tất cả tiêu chí trong hệ thống"**
  - **"Phân loại theo trạng thái, phòng ban"**
  - **"Giúp quản lý theo dõi và điều chỉnh tiêu chí đánh giá"**

---

### 🎯 6. TỔNG KẾT VÀ Q&A (3 phút)

**"Vậy là chúng ta đã demo xong toàn bộ hệ thống. Để tổng kết lại:"**

#### Điểm nổi bật của hệ thống:

1. **🎨 Giao diện hiện đại**: 
   - "Responsive design, hoạt động tốt trên mọi thiết bị"
   - "UI/UX thân thiện, dễ sử dụng"

2. **📄 Xuất PDF tiếng Việt**: 
   - "Đây là tính năng độc đáo, xử lý font tiếng Việt hoàn hảo"
   - "Nhiều loại báo cáo: đơn giản, chi tiết, cá nhân"

3. **🔧 Quản lý đầy đủ**: 
   - "CRUD hoàn chỉnh cho nhân viên, tiêu chí"
   - "Hệ thống đánh giá linh hoạt"

4. **🚀 Công nghệ hiện đại**: 
   - "React 19 + Node.js + MongoDB"
   - "RESTful API, JWT authentication"

5. **📊 Thống kê trực quan**: 
   - "Dashboard với charts và metrics"
   - "Báo cáo phân tích sâu"

#### Ứng dụng thực tế:
**"Hệ thống này có thể triển khai ngay cho các doanh nghiệp Việt Nam, đặc biệt phù hợp với các công ty cần:"**
- Quản lý nhân sự chuyên nghiệp
- Đánh giá hiệu suất định kỳ
- Báo cáo cho ban lãnh đạo
- Lưu trữ dữ liệu dài hạn

**"Có câu hỏi nào về hệ thống không ạ?"**

---

## 🎯 BACKUP TALKING POINTS

### Nếu có câu hỏi về kỹ thuật:

#### Frontend:
- **React 19**: "Sử dụng phiên bản mới nhất với hooks và functional components"
- **Vite**: "Build tool nhanh, hot reload tức thì"
- **Responsive**: "CSS flexbox và grid, tương thích mobile"

#### Backend:
- **Node.js + Express**: "RESTful API, middleware authentication"
- **MongoDB Atlas**: "Cloud database, scalable và secure"
- **JWT**: "Stateless authentication, phân quyền role-based"

#### PDF Export:
- **jsPDF**: "Library mạnh mẽ cho việc tạo PDF từ JavaScript"
- **Font handling**: "Custom setup để hỗ trợ UTF-8 và tiếng Việt"
- **Layout**: "Professional design với header/footer/pagination"

### Nếu có lỗi trong demo:
- **"Đây là môi trường development, trong production sẽ stable hơn"**
- **"Chúng ta có thể refresh và thử lại"**
- **"Tính năng này đã được test kỹ lưỡng"**

### Nếu hỏi về deployment:
- **"Có thể deploy lên Vercel, Netlify cho frontend"**
- **"Backend deploy lên Heroku, AWS, hoặc VPS"**
- **"Database đã sử dụng MongoDB Atlas cloud"**

---

## 📝 NOTES CHO NGƯỜI DEMO

### ✅ Chuẩn bị trước demo:
- [ ] Chạy `setup-and-run.bat` 
- [ ] Test tất cả URLs hoạt động
- [ ] Chuẩn bị sẵn 2-3 file PDF mẫu
- [ ] Kiểm tra internet connection (MongoDB Atlas)

### 🎯 Điểm cần nhấn mạnh:
1. **PDF tiếng Việt** - Đây là điểm khác biệt
2. **Full-stack skills** - Thể hiện khả năng làm cả FE và BE
3. **Modern tech** - React 19, MongoDB Atlas
4. **Professional UI** - Giao diện đẹp, UX tốt

### ⏰ Time management:
- **Mở đầu**: 2 phút (ngắn gọn)
- **PDF Demo**: 5 phút (trọng tâm)
- **Các tính năng khác**: 8 phút
- **Q&A**: 5 phút

**🎯 Mục tiêu: Thể hiện kỹ năng technical và khả năng build sản phẩm hoàn chỉnh**