import { useEffect, useState } from "react";
import { authHeader } from "../api";

export default function AssessmentModal({ open, onClose, employee }) {
  if (!open) return null;

  const [period, setPeriod] = useState("quarterly");
  const [cycle, setCycle] = useState("Q1 2025");
  const [criteria, setCriteria] = useState([]); // lấy từ API
  const [comment, setComment] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingCriteria, setFetchingCriteria] = useState(true);

  const periods = [
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
  ];

  const cycles = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"];

  // 🔹 Fetch criteria từ API theo phòng ban của nhân viên
  useEffect(() => {
    async function fetchCriteria() {
      try {
        setFetchingCriteria(true);
        // Lấy tiêu chí theo phòng ban của nhân viên
        const url = employee.department 
          ? `http://localhost:4000/api/criteria?department=${encodeURIComponent(employee.department)}`
          : "http://localhost:4000/api/criteria";
          
        const res = await fetch(url, {
          headers: { ...authHeader() },
        });
        const data = await res.json();

        // Nếu có lỗi
        if (!res.ok) throw new Error(data.message || "Không thể lấy tiêu chí");

        // Chuyển về dạng { key, label, score, weight }
        const formatted = data.map((c) => ({
          key: c.code,
          label: c.name,
          score: 3,
          weight: c.weight || 1,
          comment: ""
        }));
        setCriteria(formatted);
      } catch (err) {
        alert("❌ Lỗi khi tải tiêu chí đánh giá");
        console.error(err);
      } finally {
        setFetchingCriteria(false);
      }
    }

    if (employee) {
      fetchCriteria();
    }
  }, [employee]);

  const changeScore = (key, score) => {
    setCriteria((prev) =>
      prev.map((c) => (c.key === key ? { ...c, score: Number(score) } : c))
    );
  };

  const changeComment = (key, comment) => {
    setCriteria((prev) =>
      prev.map((c) => (c.key === key ? { ...c, comment } : c))
    );
  };

  // Tính điểm trung bình có trọng số
  const avg = criteria.length
    ? (() => {
        const totalWeightedScore = criteria.reduce((sum, c) => sum + (c.score * c.weight), 0);
        const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
        return totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(1) : 0;
      })()
    : 0;

  async function submit() {
    setLoading(true);
    try {
      const payload = {
        employee: employee._id,
        period,
        cycleLabel: cycle,
        criteria,
        comment,
        nextGoals: goals,
        overall: Number(avg),
      };

      const res = await fetch("http://localhost:4000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gửi đánh giá thất bại");

      alert("✅ Đánh giá đã được lưu thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi gửi đánh giá, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "white",
          borderRadius: "20px",
          padding: "0",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          border: "1px solid #f1f5f9"
        }}
      >
        {/* Header */}
        <div style={{
          padding: "30px 30px 20px",
          borderBottom: "2px solid #f1f5f9",
          background: "#f8fafc"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <div style={{
              background: "#dbeafe",
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "20px" }}>📝</span>
            </div>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: "22px", 
                fontWeight: "700",
                color: "#1f2937"
              }}>
                Tạo đánh giá mới
              </h3>
              <p style={{ 
                margin: "5px 0 0 0", 
                color: "#6b7280", 
                fontSize: "14px" 
              }}>
                Đánh giá hiệu suất cho nhân viên
              </p>
            </div>
          </div>
          
          {/* Employee Info */}
          <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "14px"
              }}>
                {employee.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || '??'}
              </div>
              <div>
                <div style={{ 
                  fontSize: "16px", 
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  {employee.fullName}
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  color: "#6b7280"
                }}>
                  {employee.position} • {employee.department || 'Chưa phân phòng ban'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "25px 30px" }}>

          {/* Assessment Period & Cycle */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "20px", 
            marginBottom: "25px" 
          }}>
            <div>
              <label style={{ 
                display: "block",
                fontSize: "14px", 
                color: "#374151",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                Kỳ đánh giá
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "12px 15px", 
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "14px",
                  background: "white",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              >
                {periods.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ 
                display: "block",
                fontSize: "14px", 
                color: "#374151",
                fontWeight: "600",
                marginBottom: "8px"
              }}>
                Chu kỳ
              </label>
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "12px 15px", 
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "14px",
                  background: "white",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              >
                {cycles.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Criteria Section */}
          <div style={{ marginBottom: "25px" }}>
            <h4 style={{ 
              margin: "0 0 15px 0", 
              fontSize: "18px", 
              fontWeight: "600",
              color: "#1f2937",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              📊 Tiêu chí đánh giá
            </h4>
            
            {fetchingCriteria ? (
              <div style={{ 
                textAlign: "center", 
                padding: "40px 20px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>⏳</div>
                <div style={{ color: "#6b7280", fontSize: "16px" }}>
                  Đang tải tiêu chí đánh giá...
                </div>
              </div>
            ) : criteria.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "40px 20px",
                background: "#fef3c7",
                borderRadius: "12px",
                border: "1px solid #fbbf24",
                color: "#92400e"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>⚠️</div>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>
                  Chưa có tiêu chí đánh giá nào được kích hoạt
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {criteria.map((c, i) => {
                  const getScoreColor = (score) => {
                    if (score >= 4.5) return "#10b981";
                    if (score >= 4) return "#3b82f6";
                    if (score >= 3) return "#f59e0b";
                    return "#ef4444";
                  };

                  const getScoreLabel = (score) => {
                    if (score >= 4.5) return "Xuất sắc";
                    if (score >= 4) return "Tốt";
                    if (score >= 3) return "Khá";
                    if (score >= 2) return "Trung bình";
                    return "Cần cải thiện";
                  };

                  return (
                    <div key={i} style={{ 
                      padding: "20px", 
                      background: "white", 
                      borderRadius: "12px",
                      border: "2px solid #f1f5f9",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                    }}>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        marginBottom: "12px" 
                      }}>
                        <div>
                          <label style={{ 
                            fontWeight: "600", 
                            fontSize: "16px",
                            color: "#1f2937"
                          }}>
                            {c.label}
                          </label>
                          {c.weight !== 1 && (
                            <span style={{ 
                              fontSize: "12px", 
                              color: "#6b7280", 
                              marginLeft: "8px",
                              background: "#f3f4f6",
                              padding: "3px 8px",
                              borderRadius: "12px",
                              fontWeight: "500"
                            }}>
                              Trọng số: {c.weight}
                            </span>
                          )}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ 
                            fontSize: "24px", 
                            fontWeight: "700",
                            color: getScoreColor(c.score)
                          }}>
                            {c.score}/5
                          </div>
                          <div style={{ 
                            fontSize: "12px", 
                            color: getScoreColor(c.score),
                            fontWeight: "500"
                          }}>
                            {getScoreLabel(c.score)}
                          </div>
                        </div>
                      </div>
                      
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={c.score}
                        onChange={(e) => changeScore(c.key, e.target.value)}
                        style={{ 
                          width: "100%", 
                          marginBottom: "12px",
                          accentColor: getScoreColor(c.score),
                          height: "6px"
                        }}
                      />
                      
                      <textarea
                        placeholder="Nhận xét chi tiết cho tiêu chí này (tùy chọn)..."
                        value={c.comment}
                        onChange={(e) => changeComment(c.key, e.target.value)}
                        rows={2}
                        style={{ 
                          width: "100%", 
                          padding: "10px 12px", 
                          fontSize: "14px",
                          border: "2px solid #e5e7eb",
                          borderRadius: "8px",
                          resize: "vertical",
                          transition: "all 0.2s ease",
                          outline: "none"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                        onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Comments & Goals */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "25px" }}>
            <div>
              <label style={{ 
                display: "block",
                fontSize: "16px", 
                color: "#374151",
                fontWeight: "600",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                💬 Nhận xét tổng quan
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                style={{ 
                  width: "100%", 
                  padding: "12px 15px", 
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "14px",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                placeholder="Nhập nhận xét tổng quan về hiệu suất làm việc của nhân viên..."
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>

            <div>
              <label style={{ 
                display: "block",
                fontSize: "16px", 
                color: "#374151",
                fontWeight: "600",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                🎯 Mục tiêu kỳ tới
              </label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={3}
                style={{ 
                  width: "100%", 
                  padding: "12px 15px", 
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "14px",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                placeholder="Ví dụ: Nâng cao kỹ năng lãnh đạo, cải thiện giao tiếp với khách hàng, hoàn thành khóa học chuyên môn..."
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>
          </div>

          {/* Overall Score */}
          {criteria.length > 0 && (
            <div style={{ 
              padding: "20px", 
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", 
              borderRadius: "16px",
              border: "2px solid #0ea5e9",
              marginBottom: "25px",
              textAlign: "center"
            }}>
              <div style={{ 
                fontSize: "14px", 
                color: "#0369a1",
                fontWeight: "500",
                marginBottom: "8px"
              }}>
                📊 Điểm trung bình (có trọng số)
              </div>
              <div style={{ 
                fontSize: "36px", 
                fontWeight: "800", 
                color: "#0369a1",
                textShadow: "0 2px 4px rgba(3, 105, 161, 0.1)"
              }}>
                {avg}/5
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "#0369a1",
                opacity: 0.8
              }}>
                {avg >= 4.5 ? "🏆 Xuất sắc" : 
                 avg >= 4 ? "⭐ Tốt" : 
                 avg >= 3 ? "👍 Khá" : 
                 avg >= 2 ? "📈 Trung bình" : "🔄 Cần cải thiện"}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            paddingTop: "20px",
            borderTop: "2px solid #f1f5f9"
          }}>
            <button
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "12px 24px",
                background: "#f3f4f6",
                color: "#374151",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = "#e5e7eb";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = "#f3f4f6";
                }
              }}
            >
              Hủy bỏ
            </button>
            <button
              onClick={submit}
              disabled={loading || fetchingCriteria || criteria.length === 0}
              style={{
                padding: "12px 24px",
                background: loading ? "#9ca3af" : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: (loading || fetchingCriteria || criteria.length === 0) ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow: loading ? "none" : "0 4px 12px rgba(79, 70, 229, 0.25)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                if (!loading && !fetchingCriteria && criteria.length > 0) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(79, 70, 229, 0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && !fetchingCriteria && criteria.length > 0) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.25)";
                }
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Đang lưu...
                </>
              ) : (
                <>
                  📝 Gửi đánh giá
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Animation CSS */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}
