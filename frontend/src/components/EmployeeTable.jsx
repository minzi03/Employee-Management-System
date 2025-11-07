import { Link } from "react-router-dom";
import { performanceLabel } from "../utils/performanceLabel";

export default function EmployeeTable({ employees, onEvaluate }) {
  const getPerformanceStyle = (score) => {
    if (score >= 4.5) return { bg: "#dcfce7", color: "#166534", label: "Xuất sắc" };
    if (score >= 4) return { bg: "#dbeafe", color: "#1e40af", label: "Tốt" };
    if (score >= 3) return { bg: "#fef3c7", color: "#92400e", label: "Khá" };
    if (score >= 2) return { bg: "#fee2e2", color: "#dc2626", label: "Cần cải thiện" };
    return { bg: "#f3f4f6", color: "#6b7280", label: "Chưa đánh giá" };
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ 
                padding: "16px", 
                textAlign: "left", 
                fontWeight: "600", 
                color: "#374151",
                fontSize: "14px",
                borderBottom: "2px solid #e5e7eb"
              }}>
                Nhân viên
              </th>
              <th style={{ 
                padding: "16px", 
                textAlign: "left", 
                fontWeight: "600", 
                color: "#374151",
                fontSize: "14px",
                borderBottom: "2px solid #e5e7eb"
              }}>
                Phòng ban
              </th>
              <th style={{ 
                padding: "16px", 
                textAlign: "left", 
                fontWeight: "600", 
                color: "#374151",
                fontSize: "14px",
                borderBottom: "2px solid #e5e7eb"
              }}>
                Vị trí
              </th>
              <th style={{ 
                padding: "16px", 
                textAlign: "left", 
                fontWeight: "600", 
                color: "#374151",
                fontSize: "14px",
                borderBottom: "2px solid #e5e7eb"
              }}>
                Đánh giá
              </th>
              <th style={{ 
                padding: "16px", 
                textAlign: "left", 
                fontWeight: "600", 
                color: "#374151",
                fontSize: "14px",
                borderBottom: "2px solid #e5e7eb"
              }}>
                Hiệu suất
              </th>
              <th style={{ 
                padding: "16px", 
                textAlign: "center", 
                fontWeight: "600", 
                color: "#374151",
                fontSize: "14px",
                borderBottom: "2px solid #e5e7eb",
                width: "200px"
              }}>
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => {
              const perfStyle = getPerformanceStyle(emp.avgScore);
              return (
                <tr 
                  key={emp._id} 
                  style={{ 
                    borderBottom: "1px solid #f1f5f9",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'][index % 5]} 0%, ${['#764ba2', '#667eea', '#f5576c', '#f093fb', '#00f2fe'][index % 5]} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px"
                      }}>
                        {emp.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1f2937" }}>
                          {emp.fullName}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{
                      background: "#f0f9ff",
                      color: "#0369a1",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {emp.department}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: "#4b5563", fontSize: "14px" }}>
                    {emp.position}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
                        {emp.reviewCount || 0}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        đánh giá
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background: perfStyle.bg,
                      color: perfStyle.color,
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      {performanceLabel(emp.avgScore)}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <Link
                        to={`/employee/${emp._id}`}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: "2px solid #e5e7eb",
                          textDecoration: "none",
                          color: "#374151",
                          background: "white",
                          fontSize: "12px",
                          fontWeight: "500",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = "#4f46e5";
                          e.target.style.color = "#4f46e5";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.color = "#374151";
                        }}
                      >
                        👁️ Xem
                      </Link>

                      <button
                        onClick={() => onEvaluate(emp)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: "none",
                          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-1px)";
                          e.target.style.boxShadow = "0 4px 8px rgba(79, 70, 229, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        📝 Đánh giá
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!employees.length && (
              <tr>
                <td colSpan={6} style={{ 
                  padding: "40px", 
                  textAlign: "center", 
                  color: "#6b7280",
                  fontSize: "16px"
                }}>
                  <div style={{ marginBottom: "10px", fontSize: "48px" }}>📋</div>
                  <div style={{ fontWeight: "500" }}>Không có nhân viên nào</div>
                  <div style={{ fontSize: "14px", marginTop: "5px" }}>
                    Thử thay đổi bộ lọc tìm kiếm
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
