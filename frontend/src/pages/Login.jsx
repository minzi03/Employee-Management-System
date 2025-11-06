import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [params] = useSearchParams();
  const roleHint = params.get("role"); // "supervisor" | "employee" | null
  const [username, setUsername] = useState(roleHint === "supervisor" ? "manager" : "sarah.johnson");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const getRoleInfo = () => {
    switch (roleHint) {
      case "supervisor":
        return {
          title: "Đăng nhập Supervisor",
          subtitle: "Quản lý và đánh giá nhân viên",
          icon: "👑",
          color: "#667eea"
        };
      case "employee":
        return {
          title: "Đăng nhập Employee", 
          subtitle: "Xem báo cáo đánh giá của bạn",
          icon: "👤",
          color: "#059669"
        };
      default:
        return {
          title: "Đăng nhập Hệ thống",
          subtitle: "Hệ thống Đánh giá Nhân viên",
          icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L8 4V10C8 14.5 10.5 18.26 14 19.22C17.5 18.26 20 14.5 20 10V4L12 2Z" 
                    fill="white"/>
              <path d="M10 12L12 14L16 10" 
                    stroke="#667eea" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
          ),
          color: "#667eea"
        };
    }
  };

  const roleInfo = getRoleInfo();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { token, user } = await login(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      nav(user.role === "supervisor" ? "/supervisor" : "/me", { replace: true });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  const quickLogin = (role) => {
    if (role === "supervisor") {
      setUsername("manager");
      setPassword("123456");
    } else {
      setUsername("sarah.johnson");
      setPassword("123456");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
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

      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        padding: "40px",
        width: "100%",
        maxWidth: "440px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        position: "relative",
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          {/* Logo */}
          <div style={{
            background: `linear-gradient(135deg, ${roleInfo.color} 0%, #7c3aed 100%)`,
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: `0 10px 25px ${roleInfo.color}40`
          }}>
            {typeof roleInfo.icon === 'string' ? (
              <span style={{ fontSize: "32px", color: "white" }}>{roleInfo.icon}</span>
            ) : (
              roleInfo.icon
            )}
          </div>

          {/* Title */}
          <h1 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "28px", 
            fontWeight: "700",
            color: "#1f2937"
          }}>
            {roleInfo.title}
          </h1>
          
          <p style={{ 
            margin: "0 0 20px 0", 
            color: "#6b7280", 
            fontSize: "16px",
            fontWeight: "500"
          }}>
            {roleInfo.subtitle}
          </p>

          {/* Back to Home */}
          <Link 
            to="/"
            style={{
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f3f4f6";
              e.target.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#6b7280";
            }}
          >
            ← Về trang chủ
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} style={{ marginBottom: "30px" }}>
          {/* Username Field */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block",
              fontSize: "14px", 
              color: "#374151",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Tên đăng nhập
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
                fontSize: "16px"
              }}>
                👤
              </div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                required
                style={{ 
                  width: "400px", 
                  padding: "12px 15px 12px 40px", 
                  borderRadius: "12px", 
                  border: "2px solid #e5e7eb", 
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  outline: "none",
                  background: "white"
                }}
                onFocus={(e) => e.target.style.borderColor = roleInfo.color}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ 
              display: "block",
              fontSize: "14px", 
              color: "#374151",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Mật khẩu
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
                fontSize: "16px"
              }}>
                🔒
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
                style={{ 
                  width: "360px", 
                  padding: "12px 50px 12px 45px", 
                  borderRadius: "12px", 
                  border: "2px solid #e5e7eb", 
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  outline: "none",
                  background: "white"
                }}
                onFocus={(e) => e.target.style.borderColor = roleInfo.color}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: "4px"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {err && (
            <div style={{
              background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #fecaca",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              <span>❌</span>
              {err}
            </div>
          )}

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading || !username || !password} 
            style={{ 
              width: "100%", 
              padding: "14px", 
              borderRadius: "12px", 
              border: "none", 
              background: loading ? "#9ca3af" : `linear-gradient(135deg, ${roleInfo.color} 0%, #7c3aed 100%)`,
              color: "white", 
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: loading ? "none" : `0 4px 12px ${roleInfo.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = `0 6px 16px ${roleInfo.color}50`;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = `0 4px 12px ${roleInfo.color}40`;
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
                Đang đăng nhập...
              </>
            ) : (
              <>
                🚀 Đăng nhập
              </>
            )}
          </button>
        </form>

        {/* Quick Login Options */}
        <div style={{
          background: "#f8fafc",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #e2e8f0"
        }}>
          <h4 style={{ 
            margin: "0 0 15px 0", 
            fontSize: "14px", 
            fontWeight: "600",
            color: "#374151",
            textAlign: "center"
          }}>
            🚀 Đăng nhập nhanh
          </h4>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => quickLogin("supervisor")}
              style={{
                flex: 1,
                padding: "10px 12px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500",
                color: "#374151",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#4f46e5";
                e.target.style.color = "white";
                e.target.style.borderColor = "#4f46e5";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#374151";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              👑 Supervisor
            </button>
            
            <button
              type="button"
              onClick={() => quickLogin("employee")}
              style={{
                flex: 1,
                padding: "10px 12px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500",
                color: "#374151",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#059669";
                e.target.style.color = "white";
                e.target.style.borderColor = "#059669";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#374151";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              👤 Employee
            </button>
          </div>
          
          <div style={{ 
            marginTop: "12px", 
            fontSize: "11px", 
            color: "#6b7280",
            textAlign: "center",
            lineHeight: "1.4"
          }}>
            <div><strong>Supervisor:</strong> manager / 123456</div>
            <div><strong>Employee:</strong> sarah.johnson / 123456</div>
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
