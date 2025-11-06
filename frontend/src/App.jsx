import { Link } from "react-router-dom";

export default function App() {
  const features = [
    { 
      title: "Quản lý Nhân viên", 
      icon: "👥",
      description: "Theo dõi và quản lý thông tin nhân viên hiệu quả",
      color: "#3b82f6",
      bgColor: "#dbeafe"
    },
    { 
      title: "Đánh giá Hiệu suất", 
      icon: "📊",
      description: "Hệ thống đánh giá đa tiêu chí chuyên nghiệp",
      color: "#10b981",
      bgColor: "#dcfce7"
    },
    { 
      title: "Thống kê & Báo cáo", 
      icon: "📈",
      description: "Báo cáo chi tiết và thống kê theo thời gian",
      color: "#f59e0b",
      bgColor: "#fef3c7"
    },
    { 
      title: "Theo dõi Tiến độ", 
      icon: "📅",
      description: "Giám sát tiến độ và mục tiêu cá nhân",
      color: "#8b5cf6",
      bgColor: "#ede9fe"
    },
    { 
      title: "Đánh giá Đa tiêu chí", 
      icon: "🎯",
      description: "Cấu hình linh hoạt các tiêu chí đánh giá",
      color: "#ef4444",
      bgColor: "#fee2e2"
    }
  ];

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }} />

      {/* Hero Section */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 20px 60px",
        textAlign: "center",
        color: "white"
      }}>
        {/* Logo */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "120px",
          height: "120px",
          borderRadius: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
          boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
          animation: "float 3s ease-in-out infinite"
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L8 4V10C8 14.5 10.5 18.26 14 19.22C17.5 18.26 20 14.5 20 10V4L12 2Z" 
                  fill="white"/>
            <path d="M10 12L12 14L16 10" 
                  stroke="#667eea" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Main Title */}
        <h1 style={{ 
          margin: "0 0 20px 0", 
          fontSize: "56px", 
          fontWeight: "800",
          textShadow: "0 4px 8px rgba(0,0,0,0.2)",
          lineHeight: "1.1",
          maxWidth: "800px"
        }}>
          Hệ thống Đánh giá Nhân viên
        </h1>
        
        {/* Subtitle */}
        <p style={{ 
          margin: "0 0 50px 0", 
          fontSize: "22px", 
          opacity: 0.9,
          maxWidth: "700px",
          lineHeight: "1.6",
          fontWeight: "300"
        }}>
          Giải pháp toàn diện giúp doanh nghiệp quản lý và đánh giá hiệu suất nhân viên một cách chuyên nghiệp
        </p>
        
        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            to="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "18px 36px",
              background: "rgba(255,255,255,0.15)",
              color: "white",
              borderRadius: "16px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "600",
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.25)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.15)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
            }}
          >
            <span>🚀</span>
            Đăng nhập vào hệ thống
          </Link>

          <Link
            to="/login?role=supervisor"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "18px 36px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "16px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "600",
              border: "2px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <span>👑</span>
            Demo Supervisor
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        padding: "80px 20px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ 
              margin: "0 0 20px 0", 
              fontSize: "42px", 
              fontWeight: "700",
              color: "#1f2937"
            }}>
              Tính năng Nổi bật
            </h2>
            <p style={{ 
              margin: 0, 
              fontSize: "18px", 
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Khám phá những tính năng mạnh mẽ giúp tối ưu hóa quy trình đánh giá nhân viên
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            marginBottom: "80px"
          }}>
            {features.map((feature, i) => (
              <div 
                key={i}
                style={{
                  background: "white",
                  padding: "40px 30px",
                  borderRadius: "24px",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{
                  background: feature.bgColor,
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 25px",
                  boxShadow: `0 8px 25px ${feature.color}20`
                }}>
                  <span style={{ fontSize: "32px" }}>{feature.icon}</span>
                </div>
                <h3 style={{ 
                  margin: "0 0 15px 0", 
                  fontSize: "22px", 
                  fontWeight: "700", 
                  color: feature.color
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: "#64748b", 
                  fontSize: "16px",
                  lineHeight: "1.6"
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            borderRadius: "24px",
            padding: "60px 40px",
            textAlign: "center",
            border: "1px solid #e2e8f0"
          }}>
            <h3 style={{ 
              margin: "0 0 40px 0", 
              fontSize: "28px", 
              fontWeight: "700",
              color: "#1f2937"
            }}>
              Được tin tưởng bởi hàng nghìn doanh nghiệp
            </h3>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px"
            }}>
              {[
                { value: "500+", label: "Doanh nghiệp", icon: "🏢" },
                { value: "10K+", label: "Nhân viên", icon: "👥" },
                { value: "50K+", label: "Đánh giá", icon: "📊" },
                { value: "99%", label: "Hài lòng", icon: "⭐" }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: "48px", 
                    fontWeight: "800", 
                    color: "#4f46e5",
                    marginBottom: "8px",
                    textShadow: "0 2px 4px rgba(79, 70, 229, 0.1)"
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    color: "#64748b", 
                    fontSize: "16px",
                    fontWeight: "600"
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h3 style={{ 
              margin: "0 0 20px 0", 
              fontSize: "32px", 
              fontWeight: "700",
              color: "#1f2937"
            }}>
              Sẵn sàng bắt đầu?
            </h3>
            <p style={{ 
              margin: "0 0 30px 0", 
              fontSize: "18px", 
              color: "#6b7280",
              maxWidth: "500px",
              margin: "0 auto 30px"
            }}>
              Trải nghiệm hệ thống đánh giá nhân viên hiện đại và chuyên nghiệp
            </p>
            
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/login?role=supervisor"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  color: "white",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.3)";
                }}
              >
                👑 Dùng thử Supervisor
              </Link>
              
              <Link
                to="/login?role=employee"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  background: "white",
                  color: "#374151",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "2px solid #e5e7eb",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#4f46e5";
                  e.target.style.color = "#4f46e5";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.color = "#374151";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                👤 Dùng thử Employee
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
        `}
      </style>
    </div>
  );
}
