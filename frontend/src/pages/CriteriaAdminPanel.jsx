import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCriteria,
  createCriteriaSet,
  deleteCriteria,
  getCriteria,
  activateCriteriaVersion,
  getDepartments,
} from "../api";
import Navbar from "../components/Navbar";

export default function CriteriaAdminPanel() {
  const [criteria, setCriteria] = useState([]);
  const [activeCriteria, setActiveCriteria] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [viewDepartment, setViewDepartment] = useState("");
  const [newList, setNewList] = useState([
    { code: "", name: "", description: "", weight: 1 },
  ]);

  // 🔹 Fetch all criteria & active set
  async function fetchData() {
    try {
      setLoading(true);
      const [all, active, depts] = await Promise.all([
        getAllCriteria(),
        getCriteria(viewDepartment || null),
        getDepartments(),
      ]);
      setCriteria(all);
      setActiveCriteria(active);
      setDepartments(depts);
    } catch (err) {
      alert("❌ Lỗi khi tải dữ liệu tiêu chí");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [viewDepartment]);

  // ➕ Thêm dòng tiêu chí mới
  const addRow = () =>
    setNewList([...newList, { code: "", name: "", description: "", weight: 1 }]);
  const changeRow = (i, field, value) => {
    const updated = [...newList];
    updated[i][field] = field === "weight" ? Number(value) || 1 : value;
    setNewList(updated);
  };
  const removeRow = (i) => setNewList(newList.filter((_, idx) => idx !== i));

  // 💾 Gửi tạo version mới
  async function handleCreateVersion() {
    if (!version || newList.some((c) => !c.code || !c.name)) {
      return alert("⚠️ Hãy nhập đầy đủ mã và tên tiêu chí!");
    }
    try {
      const deptValue = selectedDepartment === "all" ? null : selectedDepartment;
      await createCriteriaSet(Number(version), newList, deptValue);
      const deptLabel = deptValue ? ` cho phòng ban ${deptValue}` : " chung";
      alert(`✅ Đã tạo bộ tiêu chí version ${version}${deptLabel}`);
      setVersion("");
      setSelectedDepartment("");
      setNewList([{ code: "", name: "", description: "", weight: 1 }]);
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
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "20px" 
        }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            📋 Quản lý Bộ Tiêu chí Đánh giá
          </h2>
          <Link 
            to="/supervisor" 
            style={{
              background: "#6b7280",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            ← Quay lại Dashboard
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div>⏳ Đang tải dữ liệu...</div>
          </div>
        ) : (
          <>
            {/* === BỘ LỌC PHÒNG BAN === */}
            <section style={{ 
              background: "white", 
              padding: "20px", 
              borderRadius: "12px", 
              marginBottom: "20px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>🔍 Lọc theo Phòng ban</h3>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <label style={{ fontWeight: "500" }}>Xem tiêu chí cho:</label>
                <select
                  value={viewDepartment}
                  onChange={(e) => setViewDepartment(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                >
                  <option value="">Tất cả phòng ban</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </section>

            {/* === BỘ HIỆN HÀNH === */}
            <section style={{ 
              background: "white", 
              padding: "20px", 
              borderRadius: "12px", 
              marginBottom: "20px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
                🟢 Bộ tiêu chí đang áp dụng
                {viewDepartment && ` - Phòng ban: ${viewDepartment}`}
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      <th style={th}>Mã</th>
                      <th style={th}>Tên tiêu chí</th>
                      <th style={th}>Mô tả</th>
                      <th style={th}>Phòng ban</th>
                      <th style={th}>Trọng số</th>
                      <th style={th}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCriteria.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ 
                          padding: "40px", 
                          textAlign: "center", 
                          color: "#6b7280" 
                        }}>
                          Chưa có tiêu chí nào được kích hoạt
                        </td>
                      </tr>
                    ) : (
                      activeCriteria.map((c) => (
                        <tr key={c._id} style={{ borderTop: "1px solid #e5e7eb" }}>
                          <td style={td}>{c.code}</td>
                          <td style={td}>{c.name}</td>
                          <td style={td}>{c.description || "-"}</td>
                          <td style={td}>
                            <span style={{
                              background: c.department ? "#dbeafe" : "#f3f4f6",
                              color: c.department ? "#1e40af" : "#6b7280",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}>
                              {c.department || "Chung"}
                            </span>
                          </td>
                          <td style={td}>{c.weight || 1}</td>
                          <td style={td}>
                            <button
                              onClick={() => handleDelete(c._id)}
                              style={btnDanger}
                            >
                              Xoá
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
          </section>

            {/* === FORM TẠO VERSION MỚI === */}
            <section style={{ 
              background: "white", 
              padding: "20px", 
              borderRadius: "12px", 
              marginBottom: "20px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>➕ Tạo bộ tiêu chí version mới</h3>
              
              <div style={{ display: "flex", gap: "20px", marginBottom: "15px", flexWrap: "wrap" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                    Version:
                  </label>
                  <input
                    type="number"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    style={{
                      width: "100px",
                      padding: "8px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px"
                    }}
                    placeholder="VD: 2"
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                    Áp dụng cho:
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      minWidth: "150px"
                    }}
                  >
                    <option value="">Chọn phòng ban</option>
                    <option value="all">Tất cả phòng ban (Chung)</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#374151" }}>
                  Danh sách tiêu chí:
                </h4>
                {newList.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 1fr 80px 60px",
                      gap: "10px",
                      marginBottom: "10px",
                      alignItems: "center",
                      padding: "10px",
                      background: "#f9fafb",
                      borderRadius: "8px"
                    }}
                  >
                    <input
                      placeholder="Mã"
                      value={row.code}
                      onChange={(e) => changeRow(i, "code", e.target.value)}
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                    <input
                      placeholder="Tên tiêu chí"
                      value={row.name}
                      onChange={(e) => changeRow(i, "name", e.target.value)}
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                    <input
                      placeholder="Mô tả (tuỳ chọn)"
                      value={row.description}
                      onChange={(e) => changeRow(i, "description", e.target.value)}
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                    <input
                      type="number"
                      placeholder="1"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={row.weight}
                      onChange={(e) => changeRow(i, "weight", e.target.value)}
                      style={{
                        padding: "8px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                    <button 
                      onClick={() => removeRow(i)} 
                      style={{
                        ...btnDangerSmall,
                        width: "100%",
                        padding: "8px"
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-start" }}>
                <button onClick={addRow} style={btnNeutral}>
                  ➕ Thêm tiêu chí
                </button>
                <button 
                  onClick={handleCreateVersion} 
                  style={btnPrimary}
                  disabled={!version || !selectedDepartment || newList.some(c => !c.code || !c.name)}
                >
                  💾 Lưu version mới
                </button>
              </div>
            </section>

            {/* === LỊCH SỬ CÁC VERSION === */}
            <section style={{ 
              background: "white", 
              padding: "20px", 
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>🕒 Lịch sử các version</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      <th style={th}>Version</th>
                      <th style={th}>Mã</th>
                      <th style={th}>Tên tiêu chí</th>
                      <th style={th}>Phòng ban</th>
                      <th style={th}>Trọng số</th>
                      <th style={th}>Trạng thái</th>
                      <th style={th}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ 
                          padding: "40px", 
                          textAlign: "center", 
                          color: "#6b7280" 
                        }}>
                          Chưa có tiêu chí nào
                        </td>
                      </tr>
                    ) : (
                      criteria.map((c) => (
                        <tr key={c._id} style={{ borderTop: "1px solid #e5e7eb" }}>
                          <td style={td}>{c.version}</td>
                          <td style={td}>{c.code}</td>
                          <td style={td}>{c.name}</td>
                          <td style={td}>
                            <span style={{
                              background: c.department ? "#dbeafe" : "#f3f4f6",
                              color: c.department ? "#1e40af" : "#6b7280",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}>
                              {c.department || "Chung"}
                            </span>
                          </td>
                          <td style={td}>{c.weight || 1}</td>
                          <td style={td}>
                            {c.isActive ? (
                              <span style={{ 
                                color: "#059669", 
                                fontWeight: "bold",
                                background: "#d1fae5",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                fontSize: "12px"
                              }}>
                                Active
                              </span>
                            ) : (
                              <span style={{ 
                                color: "#6b7280",
                                background: "#f3f4f6",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                fontSize: "12px"
                              }}>
                                Inactive
                              </span>
                            )}
                          </td>
                          <td style={td}>
                            {!c.isActive && (
                              <button
                                onClick={() => handleActivate(c.version)}
                                style={btnActive}
                              >
                                Kích hoạt v{c.version}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
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
