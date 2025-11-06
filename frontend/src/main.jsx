import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import DashboardSupervisor from "./pages/DashboardSupervisor.jsx";
import MyReports from "./pages/MyReports.jsx";
import EmployeeDetail from "./pages/EmployeeDetail.jsx";
import CriteriaAdminPanel from "./pages/CriteriaAdminPanel.jsx";
import EmployeeManagementPage from "./pages/EmployeeManagementPage.jsx";

const Guard = ({ role, children }) => {
  const me = JSON.parse(localStorage.getItem("user") || "null");
  if (!me) return <Navigate to="/login" replace />;
  if (role && me.role !== role) return <Navigate to="/login" replace />;
  return children;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* 🏠 Trang chủ */}
      <Route path="/" element={<App />} />

      {/* 🔐 Đăng nhập */}
      <Route path="/login" element={<Login />} />

      {/* 🧭 Dashboard Supervisor */}
      <Route
        path="/supervisor"
        element={
          <Guard role="supervisor">
            <DashboardSupervisor />
          </Guard>
        }
      />

      {/* 👩‍💻 Dashboard Employee */}
      <Route
        path="/me"
        element={
          <Guard role="employee">
            <MyReports />
          </Guard>
        }
      />

      {/* 📋 Chi tiết nhân viên (Supervisor) */}
      <Route
        path="/employee/:id"
        element={
          <Guard role="supervisor">
            <EmployeeDetail />
          </Guard>
        }
      />

      {/* ⚙️ Quản lý tiêu chí đánh giá (Supervisor/Admin) */}
      <Route
        path="/criteria-admin"
        element={
          <Guard role="supervisor">
            <CriteriaAdminPanel />
          </Guard>
        }
      />

      {/* 👥 Quản lý nhân viên (Supervisor) */}
      <Route
        path="/employee-management"
        element={
          <Guard role="supervisor">
            <EmployeeManagementPage />
          </Guard>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
