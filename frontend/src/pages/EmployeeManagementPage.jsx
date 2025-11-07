import Navbar from "../components/Navbar";
import EmployeeManagement from "../components/EmployeeManagement";

export default function EmployeeManagementPage() {
  return (
    <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{
          background: "#4f46e5",
          width: "60px",
          height: "60px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
        }}>
          <span style={{ fontSize: "24px" }}>👥</span>
        </div>
        
        <h1 style={{ 
          margin: "0 0 10px 0", 
          fontSize: "28px", 
          fontWeight: "700",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Quản lý Nhân viên
        </h1>
        
        <p style={{ 
          margin: "0", 
          fontSize: "16px", 
          opacity: 0.9
        }}>
          Thêm, sửa, xóa thông tin nhân viên trong hệ thống
        </p>
      </div>

      <div style={{ marginTop: "-20px" }}>
        <EmployeeManagement />
      </div>
    </div>
  );
}