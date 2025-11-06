import { useState } from "react";
import { exportAssessmentSummary } from "../utils/pdfExport";

export default function AssessmentDetailModal({ open, onClose, data }) {
  const [exportingPDF, setExportingPDF] = useState(false);

  if (!open) return null;

  // Handle PDF export
  const handleExportPDF = async () => {
    try {
      setExportingPDF(true);
      await exportAssessmentSummary(data);
      alert("✅ Xuất báo cáo PDF thành công!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("❌ Lỗi khi xuất báo cáo PDF");
    } finally {
      setExportingPDF(false);
    }
  };

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
    <div style={{
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "600px",
        background: "white",
        borderRadius: "20px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        border: "1px solid #f1f5f9"
      }}>
        {/* Header */}
        <div style={{
          padding: "30px 30px 20px",
          borderBottom: "2px solid #f1f5f9",
          background: "#f8fafc"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <div style={{
              background: "#dcfce7",
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "20px" }}>📊</span>
            </div>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: "22px", 
                fontWeight: "700",
                color: "#1f2937"
              }}>
                {data.cycleLabel}
              </h3>
              <p style={{ 
                margin: "5px 0 0 0", 
                color: "#6b7280", 
                fontSize: "14px" 
              }}>
                Chi tiết kết quả đánh giá
              </p>
            </div>
          </div>
          
          {/* Assessment Info */}
          <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <div style={{ 
                fontSize: "14px", 
                color: "#6b7280",
                fontWeight: "500"
              }}>
                Kỳ đánh giá: <strong style={{ color: "#374151" }}>{data.period}</strong>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ 
                fontSize: "24px", 
                fontWeight: "700",
                color: getScoreColor(data.overall)
              }}>
                {data.overall}/5
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: getScoreColor(data.overall),
                fontWeight: "500"
              }}>
                {getScoreLabel(data.overall)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "25px 30px" }}>
          {/* Criteria Details */}
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
              📋 Chi tiết tiêu chí
            </h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.criteria.map((c, i) => (
                <div key={i} style={{
                  padding: "15px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: c.comment ? "8px" : "0"
                  }}>
                    <div style={{ 
                      fontSize: "16px", 
                      fontWeight: "600",
                      color: "#374151"
                    }}>
                      {c.label}
                    </div>
                    <div style={{ 
                      fontSize: "18px", 
                      fontWeight: "700",
                      color: getScoreColor(c.score)
                    }}>
                      {c.score}/5
                    </div>
                  </div>
                  {c.comment && (
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      fontStyle: "italic",
                      lineHeight: "1.4"
                    }}>
                      "{c.comment}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
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
              💬 Nhận xét tổng quan
            </h4>
            <div style={{
              padding: "15px",
              background: data.comment ? "#f0f9ff" : "#f8fafc",
              borderRadius: "12px",
              border: `1px solid ${data.comment ? "#0ea5e9" : "#e2e8f0"}`,
              fontSize: "14px",
              lineHeight: "1.6",
              color: data.comment ? "#0c4a6e" : "#6b7280"
            }}>
              {data.comment || "Không có nhận xét tổng quan"}
            </div>
          </div>

          {/* Goals */}
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
              🎯 Mục tiêu kỳ tới
            </h4>
            <div style={{
              padding: "15px",
              background: data.nextGoals ? "#f0fdf4" : "#f8fafc",
              borderRadius: "12px",
              border: `1px solid ${data.nextGoals ? "#22c55e" : "#e2e8f0"}`,
              fontSize: "14px",
              lineHeight: "1.6",
              color: data.nextGoals ? "#14532d" : "#6b7280"
            }}>
              {data.nextGoals || "Không có mục tiêu cụ thể"}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "15px",
            paddingTop: "20px", 
            borderTop: "2px solid #f1f5f9" 
          }}>
            <button
              onClick={handleExportPDF}
              disabled={exportingPDF}
              style={{
                padding: "12px 24px",
                background: exportingPDF ? "#9ca3af" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: exportingPDF ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow: exportingPDF ? "none" : "0 4px 12px rgba(239, 68, 68, 0.25)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                if (!exportingPDF) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(239, 68, 68, 0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!exportingPDF) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.25)";
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

            <button
              onClick={onClose}
              style={{
                padding: "12px 32px",
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 16px rgba(79, 70, 229, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.25)";
              }}
            >
              ✅ Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
