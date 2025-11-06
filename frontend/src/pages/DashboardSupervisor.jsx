import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authHeader } from "../api";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import EmployeeTable from "../components/EmployeeTable";
import AssessmentModal from "../components/AssessmentModal";
import { calcAvgScore } from "../utils/performanceLabel";
import { exportToPDF } from "../utils/pdfExport";

export default function DashboardSupervisor() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [selected, setSelected] = useState(null);
  const [exportingPDF, setExportingPDF] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4000/api/employees", { headers: authHeader() });
      const employees = await res.json();

      for (let emp of employees) {
        const r = await fetch(`http://localhost:4000/api/assessments/employee/${emp._id}`, {
          headers: authHeader()
        });
        const list = await r.json();
        emp.assessments = list;
        emp.avgScore = calcAvgScore(list);
        emp.reviewCount = list.length;
      }

      setEmployees(employees);
      setFiltered(employees);
    }

    fetchData();
  }, []);

  useEffect(() => {
    let data = employees;
    if (search) data = data.filter(e => e.fullName.toLowerCase().includes(search.toLowerCase()));
    if (dept) data = data.filter(e => e.department === dept);
    setFiltered(data);
  }, [search, dept, employees]);

// Lọc nhân viên có điểm trung bình
const employeesWithScore = employees.filter(e => e.avgScore != null);

// Tính điểm trung bình của tất cả nhân viên
const overallAvg = employeesWithScore.length > 0
  ? (employeesWithScore.reduce((sum, e) => sum + e.avgScore, 0) / employeesWithScore.length).toFixed(2)
  : "-";

const stats = {
  total: employees.length,
  recent: 1,
  avg: overallAvg + (overallAvg >= 4 ? " ⭐" : ""),
  excellent: employeesWithScore.filter(e => e.avgScore >= 4).length
};

// Handle PDF export
const handleExportDashboard = async () => {
  try {
    setExportingPDF(true);
    await exportToPDF('dashboard-content', `Dashboard_Supervisor_${new Date().toISOString().split('T')[0]}.pdf`);
    alert("✅ Xuất báo cáo dashboard thành công!");
  } catch (error) {
    console.error("Error exporting dashboard PDF:", error);
    alert("❌ Lỗi khi xuất báo cáo PDF");
  } finally {
    setExportingPDF(false);
  }
};


  return (
    <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 20px 40px",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)"
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L8 4V10C8 14.5 10.5 18.26 14 19.22C17.5 18.26 20 14.5 20 10V4L12 2Z" 
                  fill="white"/>
            <path d="M10 12L12 14L16 10" 
                  stroke="#667eea" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 style={{ 
          margin: "0 0 10px 0", 
          fontSize: "32px", 
          fontWeight: "700",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Hệ thống Đánh giá Nhân viên
        </h1>
        
        <p style={{ 
          margin: "0 0 20px 0", 
          fontSize: "16px", 
          opacity: 0.9,
          maxWidth: "500px",
          margin: "0 auto"
        }}>
          Quản lý và theo dõi đánh giá hiệu suất nhân viên
        </p>
      </div>

      <div style={{ 
        padding: "0 24px 40px", 
        maxWidth: 1200, 
        margin: "auto",
        marginTop: "-20px"
      }}>
        {/* Export Button */}
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          marginBottom: "20px" 
        }}>
          <button
            onClick={handleExportDashboard}
            disabled={exportingPDF}
            style={{
              background: exportingPDF ? "#9ca3af" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: exportingPDF ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              fontSize: "14px",
              boxShadow: exportingPDF ? "none" : "0 4px 6px rgba(239, 68, 68, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              if (!exportingPDF) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 12px rgba(239, 68, 68, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              if (!exportingPDF) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(239, 68, 68, 0.25)";
              }
            }}
          >
            {exportingPDF ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Đang xuất...
              </>
            ) : (
              <>
                📄 Xuất Dashboard PDF
              </>
            )}
          </button>
        </div>

        {/* Dashboard Content - Wrapped for PDF export */}
        <div id="dashboard-content">
          {/* Stats Cards with improved styling */}
          <div style={{ marginBottom: "30px" }}>
            <StatsCards stats={stats} />
          </div>

        {/* Search and Filter Section */}
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          marginBottom: "25px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <div style={{
              background: "#f0f9ff",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "18px" }}>🔍</span>
            </div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
              Tìm kiếm & Lọc nhân viên
            </h3>
          </div>
          <SearchBar search={search} setSearch={setSearch} dept={dept} setDept={setDept} />
        </div>

        {/* Employee Table Section */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
          marginBottom: "30px"
        }}>
          <div style={{
            padding: "25px 25px 0",
            borderBottom: "1px solid #f1f5f9"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div style={{
                background: "#dcfce7",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px"
              }}>
                <span style={{ fontSize: "18px" }}>👥</span>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                  Danh sách Nhân viên
                </h3>
                <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                  Tổng cộng {filtered.length} nhân viên
                </p>
              </div>
            </div>
          </div>
          
          <EmployeeTable
            employees={filtered}
            onEvaluate={emp => setSelected(emp)}
          />
        </div>

        {/* Quick Actions - Enhanced */}
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
            <div style={{
              background: "#fef3c7",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "18px" }}>⚡</span>
            </div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
              Thao tác nhanh
            </h3>
          </div>
          
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            <Link 
              to="/criteria-admin" 
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 4px 6px rgba(139, 92, 246, 0.25)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 15px rgba(139, 92, 246, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(139, 92, 246, 0.25)";
              }}
            >
              <div style={{
                background: "rgba(255,255,255,0.2)",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: "20px" }}>⚙️</span>
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>Quản lý Tiêu chí</div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>Cấu hình bộ tiêu chí đánh giá</div>
              </div>
            </Link>
            
            <Link 
              to="/employee-management" 
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 4px 6px rgba(59, 130, 246, 0.25)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 15px rgba(59, 130, 246, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.25)";
              }}
            >
              <div style={{
                background: "rgba(255,255,255,0.2)",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: "20px" }}>👥</span>
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>Quản lý Nhân viên</div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>Thêm, sửa, xóa thông tin nhân viên</div>
              </div>
            </Link>
          </div>
        </div>
        </div> {/* End dashboard-content */}
      </div>

      {selected && (
        <AssessmentModal
          open={true}
          employee={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
