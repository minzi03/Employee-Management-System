# Hướng dẫn Quản lý Tiêu chí Đánh giá theo Phòng ban

## Tổng quan
Hệ thống đã được mở rộng để hỗ trợ quản lý tiêu chí đánh giá khác nhau cho từng phòng ban (IT, HR, Sales, Marketing, Finance) cũng như tiêu chí chung áp dụng cho tất cả phòng ban.

## Tính năng mới

### 1. Tiêu chí theo Phòng ban
- **Tiêu chí chung**: Áp dụng cho tất cả nhân viên (department: null)
- **Tiêu chí riêng**: Chỉ áp dụng cho phòng ban cụ thể (IT, HR, Sales, v.v.)
- **Trọng số**: Mỗi tiêu chí có thể có trọng số khác nhau (0.1 - 5.0)

### 2. Backend API Updates

#### Model Criteria
```javascript
{
  code: String,           // Mã tiêu chí (C1, C2, ...)
  name: String,           // Tên tiêu chí
  description: String,    // Mô tả
  department: String,     // Phòng ban (null = chung)
  weight: Number,         // Trọng số (default: 1)
  version: Number,        // Version
  isActive: Boolean       // Trạng thái
}
```

#### API Endpoints mới
- `GET /api/criteria?department=IT` - Lấy tiêu chí cho phòng ban IT
- `GET /api/criteria/departments` - Lấy danh sách phòng ban
- `POST /api/criteria` - Tạo tiêu chí với department và weight

### 3. Frontend Updates

#### CriteriaAdminPanel
- **Bộ lọc phòng ban**: Xem tiêu chí theo phòng ban cụ thể
- **Tạo tiêu chí mới**: Chọn phòng ban áp dụng và trọng số
- **Hiển thị nâng cao**: Thêm cột phòng ban và trọng số
- **Giao diện cải tiến**: Layout card-based, responsive

#### AssessmentModal
- **Tiêu chí động**: Tự động lấy tiêu chí theo phòng ban của nhân viên
- **Trọng số**: Hiển thị trọng số của từng tiêu chí
- **Điểm có trọng số**: Tính điểm trung bình theo trọng số
- **Nhận xét chi tiết**: Thêm nhận xét cho từng tiêu chí

## Cách sử dụng

### 1. Tạo tiêu chí theo phòng ban

1. **Truy cập Quản lý Tiêu chí**:
   - Từ Dashboard Supervisor → "⚙️ Quản lý Tiêu chí Đánh giá"
   - Hoặc từ Navbar → "Quản lý Tiêu chí"

2. **Tạo bộ tiêu chí mới**:
   - Nhập Version (VD: 2)
   - Chọn "Áp dụng cho": 
     - "Tất cả phòng ban (Chung)" - cho tiêu chí chung
     - "IT", "HR", "Sales", v.v. - cho phòng ban cụ thể
   - Thêm các tiêu chí với trọng số

3. **Ví dụ tiêu chí theo phòng ban**:

   **IT Department:**
   - C1: Kỹ năng lập trình (Trọng số: 2.0)
   - C2: Giải quyết vấn đề kỹ thuật (Trọng số: 1.5)
   - C3: Teamwork (Trọng số: 1.0)

   **HR Department:**
   - C1: Kỹ năng giao tiếp (Trọng số: 2.0)
   - C2: Quản lý nhân sự (Trọng số: 1.5)
   - C3: Tổ chức sự kiện (Trọng số: 1.0)

   **Sales Department:**
   - C1: Kỹ năng bán hàng (Trọng số: 2.5)
   - C2: Chăm sóc khách hàng (Trọng số: 1.5)
   - C3: Đạt target (Trọng số: 2.0)

### 2. Đánh giá nhân viên với tiêu chí phòng ban

1. **Từ Dashboard Supervisor**:
   - Click "Đánh giá" ở nhân viên cần đánh giá
   - Hệ thống tự động load tiêu chí phù hợp với phòng ban

2. **Trong Assessment Modal**:
   - Tiêu chí hiển thị theo phòng ban + tiêu chí chung
   - Mỗi tiêu chí có trọng số riêng
   - Điểm cuối được tính theo trọng số
   - Có thể thêm nhận xét cho từng tiêu chí

### 3. Quản lý và theo dõi

1. **Lọc tiêu chí**:
   - Sử dụng dropdown "Xem tiêu chí cho" để lọc theo phòng ban
   - Xem tất cả hoặc chỉ phòng ban cụ thể

2. **Kích hoạt version**:
   - Có thể chuyển đổi giữa các version tiêu chí
   - Mỗi phòng ban có thể có version riêng

## Công thức tính điểm

### Điểm có trọng số:
```
Điểm cuối = (Σ(Điểm tiêu chí × Trọng số)) / Σ(Trọng số)
```

### Ví dụ:
- Tiêu chí A: Điểm 4, Trọng số 2.0 → 4 × 2.0 = 8.0
- Tiêu chí B: Điểm 3, Trọng số 1.0 → 3 × 1.0 = 3.0
- Tiêu chí C: Điểm 5, Trọng số 1.5 → 5 × 1.5 = 7.5

**Điểm cuối = (8.0 + 3.0 + 7.5) / (2.0 + 1.0 + 1.5) = 18.5 / 4.5 = 4.1**

## Lợi ích

### 1. Đánh giá chính xác hơn
- Tiêu chí phù hợp với từng vị trí công việc
- Trọng số phản ánh tầm quan trọng của từng tiêu chí

### 2. Quản lý linh hoạt
- Dễ dàng tạo và chỉnh sửa tiêu chí theo phòng ban
- Có thể có nhiều version cho từng phòng ban

### 3. Báo cáo chi tiết
- Phân tích hiệu suất theo phòng ban
- So sánh giữa các phòng ban với tiêu chí riêng

## Navigation

### Từ Dashboard Supervisor:
- **Quick Actions**: 2 nút nhanh ở cuối trang
  - "⚙️ Quản lý Tiêu chí Đánh giá"
  - "👥 Quản lý Nhân viên"

### Từ Navbar:
- **Dashboard**: Quay về trang chính
- **Quản lý Nhân viên**: CRUD nhân viên
- **Quản lý Tiêu chí**: Quản lý tiêu chí đánh giá

## Lưu ý quan trọng

1. **Tiêu chí chung vs riêng**:
   - Nhân viên sẽ được đánh giá bằng tiêu chí phòng ban + tiêu chí chung
   - Nếu không có tiêu chí riêng, chỉ dùng tiêu chí chung

2. **Trọng số**:
   - Trọng số cao hơn = quan trọng hơn trong tính điểm
   - Nên cân nhắc kỹ khi đặt trọng số

3. **Version management**:
   - Mỗi lần tạo version mới sẽ vô hiệu hóa version cũ
   - Có thể kích hoạt lại version cũ nếu cần

4. **Backup dữ liệu**:
   - Nên backup trước khi thay đổi tiêu chí lớn
   - Các đánh giá cũ vẫn giữ nguyên tiêu chí tại thời điểm đánh giá