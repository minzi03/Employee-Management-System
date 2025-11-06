import { useEffect, useState } from "react";
import {
  getAllCriteria,
  createCriteriaSet,
  deleteCriteria,
  getCriteria,
  activateCriteriaVersion,
} from "../api";

export default function CriteriaAdminPanel() {
  const [criteria, setCriteria] = useState([]);
  const [activeCriteria, setActiveCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState("");
  const [newList, setNewList] = useState([
    { code: "", name: "", description: "" },
  ]);

  // 🔹 Fetch all criteria & active set
  async function fetchData() {
    try {
      setLoading(true);
      const [all, active] = await Promise.all([
        getAllCriteria(),
        getCriteria(),
      ]);
      setCriteria(all);
      setActiveCriteria(active);
    } catch (err) {
      alert("❌ Lỗi khi tải dữ liệu tiêu chí");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Thêm dòng tiêu chí mới
  const addRow = () =>
    setNewList([...newList, { code: "", name: "", description: "" }]);
  const changeRow = (i, field, value) => {
    const updated = [...newList];
    updated[i][field] = value;
    setNewList(updated);
  };
  const removeRow = (i) => setNewList(newList.filter((_, idx) => idx !== i));

  // 💾 Gửi tạo version mới
  async function handleCreateVersion() {
    if (!version || newList.some((c) => !c.code || !c.name)) {
      return alert("⚠️ Hãy nhập đầy đủ mã và tên tiêu chí!");
    }
    try {
      await createCriteriaSet(Number(version), newList);
      alert(`✅ Đã tạo bộ tiêu chí version ${version}`);
      setVersion("");
      setNewList([{ code: "", name: "", description: "" }]);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi tạo version mới");
    }
  }

  // 🗑️ Xoá tiêu chí trong version hiện hành
  async function handleDelete(id) {
    if (!window.confirm("Xoá tiêu chí này?")) return;
    try {
      await deleteCriteria(id);
      alert("🗑️ Đã xoá tiêu chí");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xoá tiêu chí");
    }
  }

  // 🔁 Kích hoạt version khác
  async function handleActivate(version) {
    if (!window.confirm(`Kích hoạt bộ tiêu chí version ${version}?`)) return;
    try {
      await activateCriteriaVersion(version);
      alert(`✅ Đã kích hoạt version ${version}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi kích hoạt version");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>📋 Quản lý Bộ Tiêu chí Đánh giá</h2>

      {loading ? (
        <div>⏳ Đang tải dữ liệu...</div>
      ) : (
        <>
          {/* === BỘ HIỆN HÀNH === */}
          <section style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 20 }}>🟢 Bộ tiêu chí đang áp dụng</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 10,
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={th}>Mã</th>
                  <th style={th}>Tên tiêu chí</th>
                  <th style={th}>Mô tả</th>
                  <th style={th}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {activeCriteria.map((c) => (
                  <tr key={c._id}>
                    <td style={td}>{c.code}</td>
                    <td style={td}>{c.name}</td>
                    <td style={td}>{c.description || "-"}</td>
                    <td style={td}>
                      <button
                        onClick={() => handleDelete(c._id)}
                        style={btnDanger}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* === FORM TẠO VERSION MỚI === */}
          <section style={{ marginBottom: 40 }}>
            <h3>➕ Tạo bộ tiêu chí version mới</h3>
            <div style={{ margin: "10px 0" }}>
              <label>Version:</label>
              <input
                type="number"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                style={{ width: 80, marginLeft: 10 }}
              />
            </div>

            {newList.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Mã (VD: C1)"
                  value={row.code}
                  onChange={(e) => changeRow(i, "code", e.target.value)}
                  style={{ flex: "0 0 80px", padding: 6 }}
                />
                <input
                  placeholder="Tên tiêu chí"
                  value={row.name}
                  onChange={(e) => changeRow(i, "name", e.target.value)}
                  style={{ flex: 1, padding: 6 }}
                />
                <input
                  placeholder="Mô tả (tuỳ chọn)"
                  value={row.description}
                  onChange={(e) => changeRow(i, "description", e.target.value)}
                  style={{ flex: 1.2, padding: 6 }}
                />
                <button onClick={() => removeRow(i)} style={btnDangerSmall}>
                  X
                </button>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button onClick={addRow} style={btnNeutral}>
                ➕ Thêm dòng
              </button>
              <button onClick={handleCreateVersion} style={btnPrimary}>
                💾 Lưu version mới
              </button>
            </div>
          </section>

          {/* === LỊCH SỬ CÁC VERSION === */}
          <section>
            <h3>🕒 Lịch sử các version</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 10,
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={th}>Version</th>
                  <th style={th}>Mã</th>
                  <th style={th}>Tên tiêu chí</th>
                  <th style={th}>Trạng thái</th>
                  <th style={th}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((c) => (
                  <tr key={c._id}>
                    <td style={td}>{c.version}</td>
                    <td style={td}>{c.code}</td>
                    <td style={td}>{c.name}</td>
                    <td style={td}>
                      {c.isActive ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Active
                        </span>
                      ) : (
                        <span style={{ color: "gray" }}>Inactive</span>
                      )}
                    </td>
                    <td style={td}>
                      {!c.isActive && (
                        <button
                          onClick={() => handleActivate(c.version)}
                          style={btnActive}
                        >
                          Kích hoạt version {c.version}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}

// === Styles ===
const th = { border: "1px solid #ccc", padding: "6px 8px", textAlign: "left" };
const td = { border: "1px solid #ddd", padding: "6px 8px" };
const btnPrimary = {
  background: "#4f46e5",
  color: "#fff",
  borderRadius: 6,
  padding: "6px 12px",
  border: "none",
};
const btnDanger = {
  background: "#dc2626",
  color: "#fff",
  borderRadius: 4,
  padding: "4px 8px",
  border: "none",
};
const btnDangerSmall = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  padding: "4px 6px",
};
const btnNeutral = {
  background: "#e5e7eb",
  borderRadius: 6,
  padding: "6px 12px",
};
const btnActive = {
  background: "#22c55e",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "4px 10px",
};
