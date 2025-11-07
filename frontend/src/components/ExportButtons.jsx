import React, { useState } from 'react';
import { exportEmployeeList, exportDetailedEmployeeList } from '../utils/pdfExport.js';

const ExportButtons = ({ employees, onSuccess, onError }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type) => {
    if (isExporting) return;
    
    try {
      setIsExporting(true);
      
      if (type === 'simple') {
        await exportEmployeeList(employees);
        onSuccess("✅ Xuất danh sách nhân viên thành công!");
      } else if (type === 'detailed') {
        await exportDetailedEmployeeList(employees);
        onSuccess("✅ Xuất báo cáo chi tiết thành công!");
      }
    } catch (error) {
      onError("❌ Có lỗi khi xuất PDF: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const buttonStyle = (bgGradient, shadowColor) => ({
    background: bgGradient,
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: isExporting ? "not-allowed" : "pointer",
    fontWeight: "600",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: `0 4px 6px ${shadowColor}`,
    transition: "all 0.2s ease",
    opacity: isExporting ? 0.7 : 1,
    position: "relative"
  });

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      {/* Simple PDF Export */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => handleExport('simple')}
          disabled={isExporting}
          style={buttonStyle(
            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            "rgba(16, 185, 129, 0.25)"
          )}
          onMouseEnter={(e) => {
            if (!isExporting) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 15px rgba(16, 185, 129, 0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isExporting) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.25)";
            }
          }}
          title="Xuất danh sách nhân viên dạng bảng đơn giản"
        >
          <span style={{ fontSize: "16px" }}>
            {isExporting ? "⏳" : "📄"}
          </span>
          {isExporting ? "Đang xuất..." : "Xuất PDF"}
        </button>
      </div>

      {/* Detailed PDF Export */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => handleExport('detailed')}
          disabled={isExporting}
          style={buttonStyle(
            "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            "rgba(139, 92, 246, 0.25)"
          )}
          onMouseEnter={(e) => {
            if (!isExporting) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 15px rgba(139, 92, 246, 0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isExporting) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(139, 92, 246, 0.25)";
            }
          }}
          title="Xuất báo cáo chi tiết với thống kê và phân tích"
        >
          <span style={{ fontSize: "16px" }}>
            {isExporting ? "⏳" : "📊"}
          </span>
          {isExporting ? "Đang xuất..." : "Báo cáo Chi tiết"}
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;