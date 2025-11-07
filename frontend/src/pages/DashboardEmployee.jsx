import { useEffect, useState, useMemo } from "react";
import { authHeader } from "../api";
import Navbar from "../components/Navbar";
import PerformanceChart from "../components/PerformanceChart";

export default function DashboardEmployee() {
  const [me, setMe] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:4000/api/auth/me", { headers: authHeader() }),
      fetch("http://localhost:4000/api/assessments/me", { headers: authHeader() })
    ])
    .then(([meRes, assessRes]) => Promise.all([meRes.json(), assessRes.json()]))
    .then(([meData, assessData]) => {
      setMe(meData);
      setAssessments(assessData);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const stats = useMemo(() => {
    if (assessments.length === 0) return { avg: 0, latest: 0, trend: 0, count: 0 };
    
    const avg = assessments.reduce((sum, item) => sum + item.overall, 0) / assessments.length;
    const latest = assessments[0]?.overall || 0;
    const previous = assessments[1]?.overall || latest;
    const trend = latest - previous;
    
    return {
      avg: avg.toFixed(1),
      latest: latest.toFixed(1),
      trend: trend.toFixed(1),
      count: assessments.length
    };
  }, [assessments]);

  const getPerformanceLevel = (score) => {
    if (score >= 4.5) return { label: "Xuất sắc", color: "#10b981", bg: "#dcfce7" };
    if (score >= 4) return { label: "Tốt", color: "#3b82f6", bg: "#dbeafe" };
    if (score >= 3) return { label: "Khá", color: "#f59e0b", bg: "#fef3c7" };
    if (score >= 2) return { label: "Trung bình", color: "#ef4444", bg: "#fee2e2" };
    return { label: "Cần cải thiện", color: "#6b7280", bg: "#f3f4f6" };
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
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Đang tải dashboard...</div>
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
          Dashboard Nhân viên
        </h1>
        
        <p style={{ 
          margin: "0", 
          fontSize: "16px", 
          opacity: 0.9
        }}>
          Theo dõi kết quả đánh giá và tiến độ phát triển
        </p>
      </div>

      <div style={{ padding: "20px", maxWidth: 1200, margin: "0 auto", marginTop: "-20px" }}>
        
        {/* Employee Profile Card */}
        {me && (
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "25px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f1f5f9"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "24px"
              }}>
                {me.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  margin: "0 0 8px 0", 
                  fontSize: "24px", 
                  fontWeight: "700",
                  color: "#1f2937"
                }}>
                  {me.fullName}
                </h2>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>📧</span>
                    <span style={{ color: "#6b7280", fontSize: "14px" }}>{me.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>🏢</span>
                    <span style={{ color: "#6b7280", fontSize: "14px" }}>{me.department}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "16px" }}>💼</span>
                    <span style={{ color: "#6b7280", fontSize: "14px" }}>{me.position}</span>
                  </div>
                </div>
              </div>
              
              {/* Performance Badge */}
              {assessments.length > 0 && (() => {
                const level = getPerformanceLevel(stats.latest);
                return (
                  <div style={{
                    background: level.bg,
                    color: level.color,
                    padding: "12px 20px",
                    borderRadius: "20px",
                    fontSize: "16px",
                    fontWeight: "700",
                    textAlign: "center"
                  }}>
                    {level.label}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
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
              Tổng số đánh giá
            </div>
          </div>

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
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
            padding: "25px",
            borderRadius: "16px",
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
              <span style={{ fontSize: "20px" }}>🎯</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "5px" }}>
              {stats.latest}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
              Đánh giá gần nhất
            </div>
          </div>

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f1f5f9",
            textAlign: "center"
          }}>
            <div style={{
              background: stats.trend >= 0 ? "#dcfce7" : "#fee2e2",
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px"
            }}>
              <span style={{ fontSize: "20px" }}>
                {stats.trend >= 0 ? "📈" : "📉"}
              </span>
            </div>
            <div style={{ 
              fontSize: "28px", 
              fontWeight: "700", 
              color: stats.trend >= 0 ? "#10b981" : "#ef4444", 
              marginBottom: "5px" 
            }}>
              {stats.trend >= 0 ? "+" : ""}{stats.trend}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
              Xu hướng
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div style={{ marginBottom: "25px" }}>
          <PerformanceChart items={assessments} />
        </div>

        {/* Recent Assessments */}
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
                  Đánh giá Gần đây
                </h3>
                <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                  {assessments.length > 0 ? `${Math.min(3, assessments.length)} đánh giá mới nhất` : "Chưa có đánh giá"}
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ padding: "20px" }}>
            {assessments.length === 0 ? (
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
                  Bạn chưa được đánh giá lần nào. Hãy chờ supervisor đánh giá bạn.
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {assessments.slice(0, 3).map((a, index) => {
                  const level = getPerformanceLevel(a.overall);
                  return (
                    <div key={a._id} style={{
                      background: "#f8fafc",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid #e2e8f0"
                    }}>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        alignItems: "center",
                        gap: "15px"
                      }}>
                        <div style={{
                          background: "#4f46e5",
                          color: "white",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "600"
                        }}>
                          {index + 1}
                        </div>
                        
                        <div>
                          <div style={{ 
                            fontSize: "18px", 
                            fontWeight: "600",
                            color: "#1f2937",
                            marginBottom: "4px"
                          }}>
                            {a.cycleLabel}
                          </div>
                          <div style={{ 
                            fontSize: "14px", 
                            color: "#6b7280"
                          }}>
                            Kỳ: <strong>{a.period}</strong>
                          </div>
                          {a.comment && (
                            <div style={{ 
                              fontSize: "13px", 
                              color: "#6b7280",
                              marginTop: "4px",
                              fontStyle: "italic"
                            }}>
                              "{a.comment.substring(0, 100)}{a.comment.length > 100 ? '...' : ''}"
                            </div>
                          )}
                        </div>
                        
                        <div style={{ textAlign: "right" }}>
                          <div style={{ 
                            fontSize: "24px", 
                            fontWeight: "700",
                            color: level.color,
                            marginBottom: "4px"
                          }}>
                            {a.overall}/5
                          </div>
                          <div style={{
                            background: level.bg,
                            color: level.color,
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {level.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
