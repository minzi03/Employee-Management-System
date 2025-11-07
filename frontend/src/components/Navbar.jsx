import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const me = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      path: "/supervisor",
      label: "Dashboard",
      icon: "🏠",
      description: "Tổng quan hệ thống"
    },
    {
      path: "/employee-management",
      label: "Nhân viên",
      icon: "👥",
      description: "Quản lý nhân viên"
    },
    {
      path: "/criteria-admin",
      label: "Tiêu chí",
      icon: "⚙️",
      description: "Quản lý tiêu chí đánh giá"
    }
  ];

  return (
    <nav style={{
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      padding: "0 20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px"
      }}>
        {/* Logo & Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <div style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(102, 126, 234, 0.3)"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L8 4V10C8 14.5 10.5 18.26 14 19.22C17.5 18.26 20 14.5 20 10V4L12 2Z" 
                      fill="white"/>
                <path d="M10 12L12 14L16 10" 
                      stroke="#667eea" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ 
                fontWeight: "700", 
                fontSize: "18px",
                color: "#1f2937",
                lineHeight: "1"
              }}>
                EPS
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "#6b7280",
                fontWeight: "500",
                lineHeight: "1"
              }}>
                Employee Performance
              </div>
            </div>
          </Link>
          
          {/* Navigation Links for Supervisor */}
          {me.role === "supervisor" && (
            <div style={{ 
              display: "flex", 
              gap: "8px",
              marginLeft: "30px"
            }}>
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  style={{ 
                    textDecoration: "none", 
                    color: isActive(item.path) ? "#4f46e5" : "#6b7280", 
                    fontWeight: "600",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    transition: "all 0.2s ease",
                    background: isActive(item.path) ? "rgba(79, 70, 229, 0.1)" : "transparent",
                    border: isActive(item.path) ? "1px solid rgba(79, 70, 229, 0.2)" : "1px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = "#f8fafc";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#6b7280";
                    }
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* User Info & Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 12px",
                background: "transparent",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f8fafc";
                e.target.style.borderColor = "#d1d5db";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              {/* Avatar */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "14px"
              }}>
                {me.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
              </div>
              
              {/* User Info */}
              <div style={{ textAlign: "left" }}>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: "600",
                  color: "#1f2937",
                  lineHeight: "1.2"
                }}>
                  {me.fullName || 'User'}
                </div>
                <div style={{ 
                  fontSize: "12px", 
                  color: "#6b7280",
                  lineHeight: "1.2"
                }}>
                  {me.role === 'supervisor' ? '👑 Supervisor' : '👤 Employee'}
                </div>
              </div>
              
              {/* Dropdown Arrow */}
              <span style={{ 
                fontSize: "12px", 
                color: "#9ca3af",
                transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}>
                ▼
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: "0",
                marginTop: "8px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                border: "1px solid #e5e7eb",
                minWidth: "200px",
                overflow: "hidden",
                zIndex: 1000
              }}>
                {/* User Profile Section */}
                <div style={{
                  padding: "16px",
                  borderBottom: "1px solid #f1f5f9",
                  background: "#f8fafc"
                }}>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "4px"
                  }}>
                    {me.fullName}
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#6b7280"
                  }}>
                    {me.position || 'Chưa cập nhật chức vụ'}
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#6b7280"
                  }}>
                    {me.email || 'Chưa cập nhật email'}
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ padding: "8px" }}>
                  {me.role === 'employee' && (
                    <Link
                      to="/me"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px",
                        textDecoration: "none",
                        color: "#374151",
                        borderRadius: "8px",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f3f4f6";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                      }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <span style={{ fontSize: "16px" }}>📊</span>
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        Báo cáo của tôi
                      </span>
                    </Link>
                  )}
                  
                  <button
                    onClick={logout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#fef2f2";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>🚪</span>
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
}
