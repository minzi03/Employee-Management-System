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
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 540,
          background: "#fff",
          borderRadius: 10,
          padding: 20,
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>
          Tạo đánh giá mới cho <b>{employee.fullName}</b>
          {employee.department && (
            <span style={{ 
              fontSize: "14px", 
              color: "#6b7280", 
              fontWeight: "normal",
              marginLeft: "8px"
            }}>
              ({employee.department})
            </span>
          )}
        </h3>

        {/* Kỳ đánh giá */}
        <label>Kỳ đánh giá</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Chu kỳ */}
        <label>Chu kỳ</label>
        <select
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 15 }}
        >
          {cycles.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Tiêu chí */}
        {fetchingCriteria ? (
          <div style={{ textAlign: "center", margin: "30px 0" }}>
            ⏳ Đang tải tiêu chí đánh giá...
          </div>
        ) : criteria.length === 0 ? (
          <div style={{ color: "#888", marginBottom: 15 }}>
            ⚠️ Chưa có tiêu chí đánh giá nào được kích hoạt.
          </div>
        ) : (
          criteria.map((c, i) => (
            <div key={i} style={{ 
              marginBottom: 20, 
              padding: "15px", 
              background: "#f9fafb", 
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontWeight: "500", fontSize: "14px" }}>
                  {c.label}
                  {c.weight !== 1 && (
                    <span style={{ 
                      fontSize: "12px", 
                      color: "#6b7280", 
                      marginLeft: "8px",
                      background: "#e5e7eb",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}>
                      Trọng số: {c.weight}
                    </span>
                  )}
                </label>
                <b style={{ color: "#3b82f6" }}>{c.score}/5</b>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={c.score}
                onChange={(e) => changeScore(c.key, e.target.value)}
                style={{ 
                  width: "100%", 
                  marginBottom: "8px",
                  accentColor: "#3b82f6"
                }}
              />
              <textarea
                placeholder="Nhận xét cho tiêu chí này (tùy chọn)..."
                value={c.comment}
                onChange={(e) => changeComment(c.key, e.target.value)}
                rows={2}
                style={{ 
                  width: "100%", 
                  padding: "6px 8px", 
                  fontSize: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  resize: "vertical"
                }}
              />
            </div>
          ))
        )}

        {/* Nhận xét */}
        <label>Nhận xét</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
          placeholder="Nhập nhận xét của bạn..."
        />

        {/* Mục tiêu */}
        <label>Mục tiêu kỳ sau</label>
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          rows={2}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
          placeholder="Ví dụ: Nâng cao kỹ năng lãnh đạo, cải thiện giao tiếp..."
        />

        <div style={{ 
          marginBottom: 15, 
          padding: "12px", 
          background: "#f0f9ff", 
          borderRadius: "8px",
          border: "1px solid #0ea5e9"
        }}>
          <b style={{ color: "#0369a1" }}>Điểm trung bình (có trọng số):</b> 
          <span style={{ 
            fontSize: "18px", 
            fontWeight: "bold", 
            color: "#0369a1",
            marginLeft: "8px"
          }}>
            {avg}/5
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 12,
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            style={{ padding: "8px 14px" }}
          >
            Hủy
          </button>
          <button
            onClick={submit}
            disabled={loading || fetchingCriteria}
            style={{
              padding: "8px 14px",
              background: "#4f46e5",
              color: "#fff",
              borderRadius: 6,
            }}
          >
            {loading ? "Đang lưu..." : "Gửi đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
}
