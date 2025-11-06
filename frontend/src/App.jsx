import { Link } from "react-router-dom";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #eef2ff, #faf5ff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
      }}
    >
      {/* Logo + Title */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
          }}
        >
          <span style={{ fontSize: 40, color: "white" }}>🛡</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
          Hệ thống Đánh giá Nhân viên
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#6b7280",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          Giải pháp giúp doanh nghiệp quản lý và đánh giá hiệu suất nhân viên
          một cách chuyên nghiệp
        </p>
      </div>

      {/* Button Login */}
      <Link
        to="/login"
        style={{
          background: "#0f172a",
          color: "white",
          padding: "12px 24px",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 50,
          textDecoration: "none",
        }}
      >
        Đăng nhập vào hệ thống
      </Link>

      {/* Feature icons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 16,
          maxWidth: 900,
          width: "100%",
        }}
      >
        {[
          { title: "Quản lý Nhân viên" },
          { title: "Đánh giá Hiệu suất" },
          { title: "Thống kê & Báo cáo" },
          { title: "Theo dõi Tiến độ" },
          { title: "Đánh giá Đa tiêu chí" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "20px 10px",
              textAlign: "center",
              border: "1px solid #e5e7eb",
              fontWeight: 500,
            }}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 40,
          color: "#475569",
          fontSize: 14,
        }}
      >
        <div>
          <strong>500+</strong>
          <br />
          Doanh nghiệp
        </div>
        <div>
          <strong>10k+</strong>
          <br />
          Nhân viên
        </div>
        <div>
          <strong>50k+</strong>
          <br />
          Đánh giá
        </div>
        <div>
          <strong>99%</strong>
          <br />
          Hài lòng
        </div>
      </div>
    </div>
  );
}
