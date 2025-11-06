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
import { exportCriteriaReport } from "../utils/pdfExport";

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
  const [exportingPDF, setExportingPDF] = useState(false);

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

  // Handle PDF export
  const handleExportPDF = async () => {
    if (criteria.length === 0) {
      alert("⚠️ Không có dữ liệu tiêu chí để xuất báo cáo");
      return;
    }

    try {
      setExportingPDF(true);
      await exportCriteriaReport(criteria);
      alert("✅ Xuất báo cáo PDF thành công!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("❌ Lỗi khi xuất báo cáo PDF");
    } finally {
      setExportingPDF(false);
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "60px 20px",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{
          background: "#4f46e5",
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)"
        }}>
          <span style={{ fontSize: "32px" }}>📋</span>
        </div>
        
        <h1 style={{ 
          margin: "0 0 15px 0", 
          fontSize: "32px", 
          fontWeight: "700",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Hệ thống Quản lý Tiêu chí Đánh giá
        </h1>
        
        <p style={{ 
          margin: "0 0 30px 0", 
          fontSize: "18px", 
          opacity: 0.9,
          maxWidth: "600px",
          margin: "0 auto 30px"
        }}>
          Giải pháp toàn diện giúp doanh nghiệp quản lý và đánh giá hiệu suất nhân viên một cách chuyên nghiệp
        </p>
        
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link 
            to="/supervisor" 
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              border: "2px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease"
            }}
          >
            ← Quay lại Dashboard
          </Link>

          <button
            onClick={handleExportPDF}
            disabled={exportingPDF || criteria.length === 0}
            style={{
              background: exportingPDF ? "rgba(156, 163, 175, 0.8)" : "rgba(239, 68, 68, 0.2)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              border: exportingPDF ? "2px solid rgba(156, 163, 175, 0.3)" : "2px solid rgba(239, 68, 68, 0.3)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              cursor: exportingPDF || criteria.length === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {exportingPDF ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Đang xuất...
              </>
            ) : (
              <>
                📄 Xuất báo cáo PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto", marginTop: "-40px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div>⏳ Đang tải dữ liệu...</div>
          </div>
        ) : (
          <>
            {/* === STATS CARDS === */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#dbeafe",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>👥</span>
                </div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#1e40af" }}>
                  Quản lý Nhân viên
                </h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                  {activeCriteria.length} tiêu chí đang hoạt động
                </p>
              </div>

              <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#dcfce7",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>📊</span>
                </div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#059669" }}>
                  Đánh giá Hiệu suất
                </h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                  {criteria.length} tổng tiêu chí trong hệ thống
                </p>
              </div>

              <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#fef3c7",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>📈</span>
                </div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#d97706" }}>
                  Thống kê & Báo cáo
                </h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                  {departments.length} phòng ban được quản lý
                </p>
              </div>

              <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}>
                <div style={{
                  background: "#fce7f3",
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px"
                }}>
                  <span style={{ fontSize: "20px" }}>🎯</span>
                </div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#be185d" }}>
                  Đánh giá Đa tiêu chí
                </h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                  Hệ thống đánh giá toàn diện
                </p>
              </div>
            </div>

            {/* === BỘ LỌC PHÒNG BAN === */}
            <section style={{ 
              background: "white", 
              padding: "25px", 
              borderRadius: "16px", 
              marginBottom: "25px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f1f5f9"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{
                  background: "#f0f9ff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <span style={{ fontSize: "18px" }}>🔍</span>
                </div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                  Lọc theo Phòng ban
                </h3>
              </div>
              <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
                <label style={{ fontWeight: "500", color: "#374151" }}>Xem tiêu chí cho:</label>
                <select
                  value={viewDepartment}
                  onChange={(e) => setViewDepartment(e.target.value)}
                  style={{
                    padding: "10px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    minWidth: "200px",
                    background: "white",
                    transition: "all 0.2s ease"
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
              padding: "25px", 
              borderRadius: "16px", 
              marginBottom: "25px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f1f5f9"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{
                  background: "#dcfce7",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <span style={{ fontSize: "18px" }}>🟢</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                    Bộ tiêu chí đang áp dụng
                  </h3>
                  {viewDepartment && (
                    <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                      Phòng ban: {viewDepartment}
                    </p>
                  )}
                </div>
              </div>
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
              padding: "25px", 
              borderRadius: "16px", 
              marginBottom: "25px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f1f5f9"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{
                  background: "#f0f9ff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <span style={{ fontSize: "18px" }}>➕</span>
                </div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                  Tạo bộ tiêu chí version mới
                </h3>
              </div>
              
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
                      width: "120px",
                      padding: "12px 15px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "10px",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                    placeholder="VD: 2"
                    onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
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
                      padding: "12px 15px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "10px",
                      minWidth: "200px",
                      fontSize: "14px",
                      background: "white",
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
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
                      gridTemplateColumns: "100px 1fr 1fr 100px 60px",
                      gap: "15px",
                      marginBottom: "15px",
                      alignItems: "center",
                      padding: "20px",
                      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)"
                    }}
                  >
                    <input
                      placeholder="Mã"
                      value={row.code}
                      onChange={(e) => changeRow(i, "code", e.target.value)}
                      style={{
                        padding: "10px 12px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        outline: "none"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                      onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                    />
                    <input
                      placeholder="Tên tiêu chí"
                      value={row.name}
                      onChange={(e) => changeRow(i, "name", e.target.value)}
                      style={{
                        padding: "10px 12px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        outline: "none"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                      onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                    />
                    <input
                      placeholder="Mô tả (tuỳ chọn)"
                      value={row.description}
                      onChange={(e) => changeRow(i, "description", e.target.value)}
                      style={{
                        padding: "10px 12px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        outline: "none"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                      onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
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
                        padding: "10px 12px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                        outline: "none"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                      onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
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
              padding: "25px", 
              borderRadius: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f1f5f9"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{
                  background: "#fef3c7",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <span style={{ fontSize: "18px" }}>🕒</span>
                </div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
                  Lịch sử các version
                </h3>
              </div>
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
const th = { 
  border: "none", 
  padding: "12px 16px", 
  textAlign: "left",
  background: "#f8fafc",
  fontWeight: "600",
  color: "#374151",
  fontSize: "14px"
};
const td = { 
  border: "none", 
  padding: "12px 16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "14px",
  color: "#4b5563"
};
const btnPrimary = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  borderRadius: "10px",
  padding: "10px 20px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)"
};
const btnDanger = {
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  color: "#fff",
  borderRadius: "8px",
  padding: "6px 12px",
  border: "none",
  fontWeight: "500",
  cursor: "pointer",
  fontSize: "12px",
  transition: "all 0.2s ease"
};
const btnDangerSmall = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 8px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "12px"
};
const btnNeutral = {
  background: "#f3f4f6",
  color: "#374151",
  borderRadius: "10px",
  padding: "10px 20px",
  border: "2px solid #e5e7eb",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s ease"
};
const btnActive = {
  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "6px 12px",
  fontWeight: "500",
  cursor: "pointer",
  fontSize: "12px",
  transition: "all 0.2s ease"
};
