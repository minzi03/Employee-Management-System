# 🎨 Hướng dẫn Frontend - Employee Management System

## 🏗️ Tổng quan kiến trúc

Frontend được xây dựng với React 19, sử dụng Vite làm build tool và React Router cho navigation.

### Cấu trúc thư mục

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── AssessmentModal.jsx
│   │   ├── EmployeeForm.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DashboardSupervisor.jsx
│   │   ├── EmployeeList.jsx
│   │   ├── AssessmentList.jsx
│   │   └── CriteriaAdminPanel.jsx
│   ├── utils/            # Utility functions
│   │   └── auth.js
│   ├── api.js           # API calls
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🔧 Cài đặt và thiết lập

### 1. Cài đặt dependencies

```bash
cd frontend
npm install
```

### 2. Cấu hình API endpoint

Trong file `src/api.js`, đảm bảo API_BASE_URL đúng:

```javascript
const API_BASE_URL = 'http://localhost:4000/api';
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 🧩 Components chính

### 1. App.jsx - Main Application
```jsx
// Quản lý routing và authentication context
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
```

### 2. ProtectedRoute.jsx - Route Protection
```jsx
// Bảo vệ routes yêu cầu authentication
function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" />;
  
  return children;
}
```

## 📄 Pages (Trang chính)

### 1. Login.jsx - Trang đăng nhập
- Form đăng nhập với validation
- Xử lý authentication
- Redirect sau khi đăng nhập thành công

### 2. Dashboard.jsx - Trang chủ Admin
- Thống kê tổng quan
- Biểu đồ phân tích
- Quick actions

### 3. DashboardSupervisor.jsx - Dashboard Supervisor
- Danh sách nhân viên được quản lý
- Đánh giá đang chờ xử lý
- Thống kê team

### 4. EmployeeList.jsx - Quản lý nhân viên
- CRUD operations cho nhân viên
- Search và filter
- Pagination

### 5. CriteriaAdminPanel.jsx - Quản lý tiêu chí
- Tạo/sửa/xóa tiêu chí đánh giá
- Phân loại tiêu chí
- Trọng số đánh giá

## 🔌 API Integration (api.js)

### Base Configuration
```javascript
const API_BASE_URL = 'http://localhost:4000/api';

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });
};
```

### Authentication API
```javascript
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};
```

## 🎨 Styling và UI

### CSS Structure
- Global styles cho layout
- Component-specific styles
- Responsive design
- Dark/light theme support

### Key UI Components
- Navigation bar
- Cards và grids
- Forms và inputs
- Modals và dialogs
- Charts và graphs

## 📊 Charts và Visualization

Sử dụng Recharts cho biểu đồ:
- Bar charts cho thống kê
- Line charts cho trends
- Pie charts cho phân bố
- Responsive design

## 🔐 Authentication

### Token Management
- JWT token storage
- Auto-refresh mechanism
- Logout handling
- Route protection

### Role-based Access
- Admin: Full access
- Supervisor: Team management
- Employee: View only

## 🔧 Build và Deployment

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Code linting
```

## 🐛 Debugging

### Development Tools
- React DevTools
- Console debugging
- Network tab monitoring
- Error boundaries

### Common Issues
- API connection errors
- Authentication failures
- Routing problems
- State management issues
```