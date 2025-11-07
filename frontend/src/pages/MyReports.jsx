import { useEffect, useState, useMemo } from "react"; 
import { authHeader } from "../api";
import Navbar from "../components/Navbar";
import AssessmentDetailModal from "../components/AssessmentDetailModal";

// 🟢 Import chart components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MyReports() {
  const [me] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/assessments/me", { headers: authHeader() })
      .then(r => r.json())
      .then(data => {
        setItems(data);
      })
      .catch(err => {
        console.error("Error fetching assessments:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🟣 Format data cho chart
  const chartData = items.map(i => ({
    name: i.cycleLabel,
    score: i.overall
  }));

  // Calculate statistics
  const stats = useMemo(() => {
    if (items.length === 0) return { avg: 0, latest: 0, trend: 0, count: 0 };
    
    const avg = items.reduce((sum, item) => sum + item.overall, 0) / items.length;
    const latest = items[0]?.overall || 0;
    const previous = items[1]?.overall || latest;
    const trend = latest - previous;
    
    return {
      avg: avg.toFixed(1),
      latest: latest.toFixed(1),
      trend: trend.toFixed(1),
      count: items.length
    };
  }, [items]);

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
            <div style={{ fontSize: "18px", fontWeight: "600" }}>Đang tải báo cáo của bạn...</div>
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
          <span style={{ fontSize: "24px" }}>📊</span>
        </div>
        
        <h1 style={{ 
          margin: "0 0 10px 0", 
          fontSize: "28px", 
          fontWeight: "700",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Báo cáo Đánh giá của Tôi
        </h1>
        
        <p style={{ 
          margin: "0 0 15px 0", 
          fontSize: "16px", 
          opacity: 0.9
        }}>
          Xem kết quả đánh giá và theo dõi tiến độ phát triển
        </p>

        {/* Employee Info */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          padding: "15px 20px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "inline-flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            {me?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>
              {me?.fullName}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              {me?.position} • {me?.department}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px", maxWidth: 1200, margin: "0 auto", marginTop: "-20px" }}>

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

        {/* Performance Level Badge */}
        {items.length > 0 && (
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "25px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f1f5f9",
            textAlign: "center"
          }}>
            <h3 style={{ 
              margin: "0 0 20px 0", 
              fontSize: "18px", 
              fontWeight: "600",
              color: "#1f2937"
            }}>
              🏆 Xếp hạng hiệu suất hiện tại
            </h3>
            {(() => {
              const level = getPerformanceLevel(stats.latest);
              return (
                <div style={{
                  background: level.bg,
                  color: level.color,
                  padding: "15px 25px",
                  borderRadius: "20px",
                  fontSize: "20px",
                  fontWeight: "700",
                  display: "inline-block"
                }}>
                  {level.label}
                </div>
              );
            })()}
          </div>
        )}

        {/* 📈 Performance Trend Chart */}
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

          {chartData.length === 0 ? (
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
              width: "100%", 
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
                  Chi tiết các kỳ đánh giá và kết quả
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ padding: "20px" }}>
            {items.length === 0 ? (
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
                {items.map((a, index) => {
                  const level = getPerformanceLevel(a.overall);
                  return (
                    <div 
                      key={a._id}
                      onClick={() => setSelected(a)}
                      style={{
                        background: "#f8fafc",
                        borderRadius: "12px",
                        padding: "20px",
                        border: "1px solid #e2e8f0",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        alignItems: "center",
                        gap: "15px"
                      }}>
                        {/* Assessment Number */}
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
                        
                        {/* Assessment Info */}
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
                            Kỳ đánh giá: <strong>{a.period}</strong>
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
                        
                        {/* Score & Level */}
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
                      
                      {/* Click hint */}
                      <div style={{
                        marginTop: "12px",
                        fontSize: "12px",
                        color: "#9ca3af",
                        textAlign: "center"
                      }}>
                        👆 Click để xem chi tiết
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <AssessmentDetailModal 
          open={true}
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
