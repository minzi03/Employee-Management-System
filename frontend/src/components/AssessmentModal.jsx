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

  // 🔹 Fetch criteria từ API
  useEffect(() => {
    async function fetchCriteria() {
      try {
        setFetchingCriteria(true);
        const res = await fetch("http://localhost:4000/api/criteria", {
          headers: { ...authHeader() },
        });
        const data = await res.json();

        // Nếu có lỗi
        if (!res.ok) throw new Error(data.message || "Không thể lấy tiêu chí");

        // Chuyển về dạng { key, label, score }
        const formatted = data.map((c) => ({
          key: c.code,
          label: c.name,
          score: 3,
        }));
        setCriteria(formatted);
      } catch (err) {
        alert("❌ Lỗi khi tải tiêu chí đánh giá");
        console.error(err);
      } finally {
        setFetchingCriteria(false);
      }
    }

    fetchCriteria();
  }, []);

  const changeScore = (key, score) => {
    setCriteria((prev) =>
      prev.map((c) => (c.key === key ? { ...c, score: Number(score) } : c))
    );
  };

  const avg = criteria.length
    ? (criteria.reduce((a, b) => a + b.score, 0) / criteria.length).toFixed(1)
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
            <div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label>{c.label}</label>
                <b>{c.score}/5</b>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={c.score}
                onChange={(e) => changeScore(c.key, e.target.value)}
                style={{ width: "100%" }}
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

        <div style={{ marginBottom: 10 }}>
          <b>Điểm trung bình:</b> <span>{avg}/5</span>
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
