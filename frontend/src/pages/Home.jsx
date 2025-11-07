export default function Home() {
  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Hero Section */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        color: "white"
      }}>
        {/* Logo/Icon */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100px",
          height: "100px",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
          boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
          animation: "float 3s ease-in-out infinite"
        }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
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
          fontSize: "48px", 
          fontWeight: "800",
          textShadow: "0 4px 8px rgba(0,0,0,0.2)",
          lineHeight: "1.2"
        }}>
          Hệ thống Đánh giá Nhân viên
        </h1>
        
        {/* Subtitle */}
        <p style={{ 
          margin: "0 0 40px 0", 
          fontSize: "20px", 
          opacity: 0.9,
          maxWidth: "600px",
          lineHeight: "1.6",
          fontWeight: "300"
        }}>
          Giải pháp toàn diện giúp doanh nghiệp quản lý và đánh giá hiệu suất nhân viên một cách chuyên nghiệp
        </p>
        
        {/* CTA Button */}
        <a
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 32px",
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
        </a>
      </div>

      {/* Features Section */}
      <div style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        padding: "60px 20px",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Features Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            marginBottom: "40px"
          }}>
            {/* Feature 1 */}
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
            }}>
              <div style={{
                background: "#dbeafe",
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <span style={{ fontSize: "24px" }}>👥</span>
              </div>
              <h3 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "20px", 
                fontWeight: "600", 
                color: "#1e40af" 
              }}>
                Quản lý Nhân viên
              </h3>
              <p style={{ 
                margin: 0, 
                color: "#64748b", 
                fontSize: "15px",
                lineHeight: "1.6"
              }}>
                Theo dõi và quản lý thông tin nhân viên một cách hiệu quả
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
            }}>
              <div style={{
                background: "#dcfce7",
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <span style={{ fontSize: "24px" }}>📊</span>
              </div>
              <h3 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "20px", 
                fontWeight: "600", 
                color: "#059669" 
              }}>
                Đánh giá Hiệu suất
              </h3>
              <p style={{ 
                margin: 0, 
                color: "#64748b", 
                fontSize: "15px",
                lineHeight: "1.6"
              }}>
                Hệ thống đánh giá đa tiêu chí chuyên nghiệp và khách quan
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
            }}>
              <div style={{
                background: "#fef3c7",
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <span style={{ fontSize: "24px" }}>📈</span>
              </div>
              <h3 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "20px", 
                fontWeight: "600", 
                color: "#d97706" 
              }}>
                Thống kê & Báo cáo
              </h3>
              <p style={{ 
                margin: 0, 
                color: "#64748b", 
                fontSize: "15px",
                lineHeight: "1.6"
              }}>
                Báo cáo chi tiết và thống kê hiệu suất theo thời gian
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
            }}>
              <div style={{
                background: "#fce7f3",
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <span style={{ fontSize: "24px" }}>🎯</span>
              </div>
              <h3 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "20px", 
                fontWeight: "600", 
                color: "#be185d" 
              }}>
                Đánh giá Đa tiêu chí
              </h3>
              <p style={{ 
                margin: 0, 
                color: "#64748b", 
                fontSize: "15px",
                lineHeight: "1.6"
              }}>
                Cấu hình linh hoạt các tiêu chí đánh giá theo từng phòng ban
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#4f46e5",
                marginBottom: "8px"
              }}>
                500+
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>Doanh nghiệp</div>
            </div>
            <div>
              <div style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#4f46e5",
                marginBottom: "8px"
              }}>
                10K+
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>Nhân viên</div>
            </div>
            <div>
              <div style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#4f46e5",
                marginBottom: "8px"
              }}>
                50K+
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>Đánh giá</div>
            </div>
            <div>
              <div style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#4f46e5",
                marginBottom: "8px"
              }}>
                99%
              </div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>Hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}
