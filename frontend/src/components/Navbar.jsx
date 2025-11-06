import { Link } from "react-router-dom";

export default function Navbar() {
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{
      height: 60,
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>Employee Performance System</div>
        
        {/* Navigation Links for Supervisor */}
        {me.role === "supervisor" && (
          <div style={{ display: "flex", gap: 20 }}>
            <Link 
              to="/supervisor" 
              style={{ 
                textDecoration: "none", 
                color: "#374151", 
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: "6px",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              Dashboard
            </Link>
            <Link 
              to="/employee-management" 
              style={{ 
                textDecoration: "none", 
                color: "#374151", 
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: "6px",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              Quản lý Nhân viên
            </Link>
            <Link 
              to="/criteria-admin" 
              style={{ 
                textDecoration: "none", 
                color: "#374151", 
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: "6px",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              Quản lý Tiêu chí
            </Link>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ textAlign: "right", fontSize: 14 }}>
          <div>{me.fullName}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{me.position}</div>
        </div>
        <button 
          onClick={logout} 
          style={{
            border: "1px solid #d1d5db",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            background: "white"
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
