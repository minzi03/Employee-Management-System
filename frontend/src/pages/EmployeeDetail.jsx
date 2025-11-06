import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authHeader } from "../api";
import { exportEmployeeReport } from "../utils/pdfExport";

// ✅ Chart imports
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// Removed Stat component as it's replaced with new design

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportingPDF, setExportingPDF] = useState(false);

  // Fetch employee + assessments
  useEffect(() => {
    async function run() {
      try {
        const [empRes, assessRes] = await Promise.all([
          fetch("http://localhost:4000/api/employees", { headers: authHeader() }),
          fetch(`http://localhost:4000/api/assessments/employee/${id}`, { headers: authHeader() })
        ]);
        const empList = await empRes.json();
        setEmployee(empList.find(e => e._id === id) || null);

        const items = await assessRes.json();
        setAssessments(items);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [id]);

  const stats = useMemo(() => {
    if (!assessments.length) return { count: 0, avg: "—", last: "—" };
    const avg = (assessments.reduce((s, a) => s + (a.overall || 0), 0) / assessments.length).toFixed(1);
    const last = assessments[0]?.cycleLabel || "—";
    return { count: assessments.length, avg, last };
  }, [assessments]);

  const chartData = assessments.map(a => ({
    name: a.cycleLabel,
    score: a.overall
  }));

  // Handle PDF export
  const handleExportPDF = async () => {
    if (!employee || assessments.length === 0) {
      alert("⚠️ Không có dữ liệu để xuất báo cáo");
      return;
    }

    try {
      setExportingPDF(true);
      await exportEmployeeReport(employee, assessments);
      alert("✅ Xuất báo cáo PDF thành công!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("❌ Lỗi khi xuất báo cáo PDF");
    } finally {
      setExportingPDF(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "60vh",
          flexDirection: "column",
          color: "white"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>⏳</div>
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Đang tải thông tin nhân viên...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "60vh",
          flexDirection: "column",
          color: "white"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>❌</div>
            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
              Không tìm thấy nhân viên
            </div>
            <Link 
              to="/supervisor"
              style={{
                background: "rgba(255,255,255,0.3)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "600",
                border: "2px solid rgba(255,255,255,0.3)",
                transition: "all 0.2s ease"
              }}
            >
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <span style={{ fontSize: "24px" }}>👤</span>
        </div>
        
        <h1 style={{ 
          margin: "0 0 10px 0", 
          fontSize: "28px", 
          fontWeight: "700",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Hồ sơ Nhân viên
        </h1>
        
        <p style={{ 
          margin: "0", 
          fontSize: "16px", 
          opacity: 0.9
        }}>
          Chi tiết thông tin và lịch sử đánh giá hiệu suất
        </p>
      </div>

      <div style={{ padding: "20px", maxWidth: 1200, margin: "0 auto", marginTop: "-20px" }}>
        
        {/* Header Navigation */}
        <div style={{
          background: "white",
          padding: "20px 25px",
          borderRadius: "16px",
          marginBottom: "25px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Link 
              to="/supervisor" 
              style={{ 
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "#f3f4f6",
                color: "#374151",
                borderRadius: "10px",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f3f4f6";
              }}
            >
              <span>←</span> Quay lại Dashboard
            </Link>
            <div style={{
              background: "#dbeafe",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "18px" }}>📋</span>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                Thông tin chi tiết nhân viên
              </h2>
              <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                Xem hồ sơ và lịch sử đánh giá
              </p>
            </div>
          </div>

          {/* PDF Export Button */}
          <button
            onClick={handleExportPDF}
            disabled={exportingPDF || !employee || assessments.length === 0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              background: exportingPDF ? "#9ca3af" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: exportingPDF || !employee || assessments.length === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              fontSize: "14px",
              boxShadow: exportingPDF ? "none" : "0 4px 6px rgba(239, 68, 68, 0.25)"
            }}
            onMouseEnter={(e) => {
              if (!exportingPDF && employee && assessments.length > 0) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 12px rgba(239, 68, 68, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              if (!exportingPDF) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = exportingPDF ? "none" : "0 4px 6px rgba(239, 68, 68, 0.25)";
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
                📄 Xuất PDF
              </>
            )}
          </button>
        </div>

        {/* Profile Section */}
        <div style={{
          display: "grid", 
          gridTemplateColumns: "320px 1fr", 
          gap: "25px",
          marginBottom: "25px", 
          alignItems: "start"
        }}>
          {/* Employee Profile Card */}
          <div style={{
            background: "white", 
            borderRadius: "16px", 
            padding: "30px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f1f5f9"
          }}>
            {/* Avatar */}
            <div style={{ 
              width: "120px", 
              height: "120px", 
              background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
              borderRadius: "20px",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              margin: "0 auto 20px",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
            }}>
              <span style={{ 
                fontSize: "48px", 
                color: "white",
                fontWeight: "600"
              }}>
                {employee.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
              </span>
            </div>
            
            {/* Employee Info */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <h3 style={{ 
                margin: "0 0 8px 0", 
                fontSize: "22px", 
                fontWeight: "700",
                color: "#1f2937"
              }}>
                {employee.fullName}
              </h3>
              <p style={{ 
                margin: "0 0 15px 0", 
                color: "#6b7280", 
                fontSize: "16px",
                fontWeight: "500"
              }}>
                {employee.position}
              </p>
              
              {/* Department Badge */}
              <div style={{
                background: "#f0f9ff",
                color: "#0369a1",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
                display: "inline-block"
              }}>
                {employee.department || "Chưa phân phòng ban"}
              </div>
            </div>
            
            {/* Contact Info */}
            <div style={{ 
              background: "#f8fafc", 
              padding: "20px", 
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <h4 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "16px", 
                fontWeight: "600",
                color: "#374151"
              }}>
                Thông tin liên hệ
              </h4>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "16px" }}>📧</span>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>Email</div>
                  <div style={{ fontSize: "14px", color: "#374151" }}>
                    {employee.email || "Chưa cập nhật"}
                  </div>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "16px" }}>👤</span>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>Username</div>
                  <div style={{ fontSize: "14px", color: "#374151" }}>
                    {employee.username}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "20px" 
            }}>
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#dbeafe",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>📊</span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "5px" }}>
                  {stats.count}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
                  Số lần đánh giá
                </div>
              </div>

              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#dcfce7",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>⭐</span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "5px" }}>
                  {stats.avg}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
                  Điểm trung bình
                </div>
              </div>

              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#fef3c7",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>📅</span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#1f2937", marginBottom: "5px" }}>
                  {stats.last}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
                  Kỳ đánh giá gần nhất
                </div>
              </div>
            </div>
            
            {/* Performance Badge */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f1f5f9",
              textAlign: "center"
            }}>
              <h4 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "16px", 
                fontWeight: "600",
                color: "#374151"
              }}>
                Xếp hạng hiệu suất
              </h4>
              <div style={{
                background: stats.avg >= 4.5 ? "#dcfce7" : stats.avg >= 4 ? "#dbeafe" : stats.avg >= 3 ? "#fef3c7" : "#fee2e2",
                color: stats.avg >= 4.5 ? "#166534" : stats.avg >= 4 ? "#1e40af" : stats.avg >= 3 ? "#92400e" : "#dc2626",
                padding: "12px 20px",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: "700",
                display: "inline-block"
              }}>
                {stats.avg >= 4.5 ? "🏆 Xuất sắc" : 
                 stats.avg >= 4 ? "⭐ Tốt" : 
                 stats.avg >= 3 ? "👍 Khá" : 
                 stats.avg !== "—" ? "📈 Cần cải thiện" : "⏳ Chưa đánh giá"}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trend Chart */}
        <div style={{
          background: "white", 
          borderRadius: "16px",
          padding: "30px", 
          marginBottom: "25px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
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
              <span style={{ fontSize: "18px" }}>📈</span>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                Xu hướng Hiệu suất
              </h3>
              <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                Biểu đồ theo dõi điểm số qua các kỳ đánh giá
              </p>
            </div>
          </div>

          {!chartData.length ? (
            <div style={{ 
              textAlign: "center", 
              padding: "60px 20px",
              color: "#6b7280"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>📊</div>
              <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
                Chưa có dữ liệu đánh giá
              </div>
              <div style={{ fontSize: "14px" }}>
                Dữ liệu biểu đồ sẽ hiển thị khi có đánh giá đầu tiên
              </div>
            </div>
          ) : (
            <div style={{ 
              width: "97%", 
              height: 350,
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    domain={[0, 5]} 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#4f46e5" 
                    strokeWidth={3} 
                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#4f46e5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Assessment History */}
        <div style={{ 
          background: "white", 
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9",
          overflow: "hidden"
        }}>
          <div style={{ 
            padding: "25px 30px", 
            borderBottom: "2px solid #f1f5f9",
            background: "#f8fafc"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
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
                <span style={{ fontSize: "18px" }}>📋</span>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                  Lịch sử Đánh giá
                </h3>
                <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                  Chi tiết các kỳ đánh giá và nhận xét
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ padding: "20px" }}>
            {!assessments.length ? (
              <div style={{ 
                textAlign: "center", 
                padding: "60px 20px",
                color: "#6b7280"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "15px" }}>📝</div>
                <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
                  Chưa có đánh giá nào
                </div>
                <div style={{ fontSize: "14px" }}>
                  Nhân viên này chưa được đánh giá lần nào
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {assessments.map((a, index) => (
                  <div key={a._id} style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "25px",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    {/* Assessment Header */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      gap: "20px",
                      marginBottom: "20px"
                    }}>
                      <div>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "12px",
                          marginBottom: "8px"
                        }}>
                          <div style={{
                            background: "#4f46e5",
                            color: "white",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {index + 1}
                          </div>
                          <h4 style={{ 
                            margin: 0, 
                            fontSize: "18px", 
                            fontWeight: "600",
                            color: "#1f2937"
                          }}>
                            {a.cycleLabel}
                          </h4>
                        </div>
                        <div style={{ 
                          fontSize: "14px", 
                          color: "#6b7280",
                          fontWeight: "500"
                        }}>
                          {a.period}
                        </div>
                      </div>
                      
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          background: a.overall >= 4.5 ? "#dcfce7" : a.overall >= 4 ? "#dbeafe" : a.overall >= 3 ? "#fef3c7" : "#fee2e2",
                          color: a.overall >= 4.5 ? "#166534" : a.overall >= 4 ? "#1e40af" : a.overall >= 3 ? "#92400e" : "#dc2626",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "16px",
                          fontWeight: "700",
                          display: "inline-block"
                        }}>
                          {a.overall?.toFixed?.(1) || a.overall}/5
                        </div>
                      </div>
                    </div>

                    {/* Comment */}
                    {a.comment && (
                      <div style={{
                        background: "white",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "15px",
                        border: "1px solid #e5e7eb"
                      }}>
                        <div style={{ 
                          fontSize: "12px", 
                          color: "#6b7280", 
                          fontWeight: "500",
                          marginBottom: "5px"
                        }}>
                          💬 Nhận xét:
                        </div>
                        <div style={{ 
                          fontSize: "14px", 
                          color: "#374151",
                          lineHeight: "1.5"
                        }}>
                          {a.comment}
                        </div>
                      </div>
                    )}

                    {/* Criteria Scores */}
                    {(a.criteria || []).length > 0 && (
                      <div style={{ marginBottom: "15px" }}>
                        <div style={{ 
                          fontSize: "12px", 
                          color: "#6b7280", 
                          fontWeight: "500",
                          marginBottom: "10px"
                        }}>
                          📊 Chi tiết điểm số:
                        </div>
                        <div style={{ 
                          display: "grid", 
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                          gap: "10px" 
                        }}>
                          {a.criteria.map((c, idx) => (
                            <div key={idx} style={{
                              background: "white",
                              padding: "10px 12px",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center"
                            }}>
                              <span style={{ fontSize: "13px", color: "#374151" }}>
                                {c.label}
                              </span>
                              <span style={{ 
                                fontSize: "13px", 
                                fontWeight: "600",
                                color: "#4f46e5"
                              }}>
                                {c.score}/5
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Goals */}
                    {a.nextGoals && (
                      <div style={{
                        background: "white",
                        padding: "15px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb"
                      }}>
                        <div style={{ 
                          fontSize: "12px", 
                          color: "#6b7280", 
                          fontWeight: "500",
                          marginBottom: "5px"
                        }}>
                          🎯 Mục tiêu kỳ tới:
                        </div>
                        <div style={{ 
                          fontSize: "14px", 
                          color: "#374151",
                          lineHeight: "1.5"
                        }}>
                          {a.nextGoals}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
