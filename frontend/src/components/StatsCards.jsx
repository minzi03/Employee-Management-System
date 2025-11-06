export default function StatsCards({ stats }) {
  const cards = [
    { 
      label: "Tổng nhân viên", 
      value: stats.total,
      icon: "👥",
      color: "#3b82f6",
      bgColor: "#dbeafe"
    },
    { 
      label: "Đánh giá gần đây", 
      value: stats.recent,
      icon: "📊",
      color: "#10b981",
      bgColor: "#dcfce7"
    },
    { 
      label: "Điểm trung bình", 
      value: stats.avg,
      icon: "📈",
      color: "#f59e0b",
      bgColor: "#fef3c7"
    },
    { 
      label: "Nhân viên xuất sắc", 
      value: stats.excellent,
      icon: "🏆",
      color: "#ef4444",
      bgColor: "#fee2e2"
    }
  ];

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
      gap: "20px", 
      margin: "20px 0" 
    }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          background: "white",
          borderRadius: "16px",
          padding: "25px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9",
          transition: "all 0.2s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ 
                fontSize: "14px", 
                color: "#6b7280", 
                fontWeight: "500",
                marginBottom: "8px"
              }}>
                {c.label}
              </div>
              <div style={{ 
                fontSize: "28px", 
                fontWeight: "700",
                color: "#1f2937"
              }}>
                {c.value}
              </div>
            </div>
            <div style={{
              background: c.bgColor,
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "20px" }}>{c.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
