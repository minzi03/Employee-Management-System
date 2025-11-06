import { useState, useEffect } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api.js";
import ExportButtons from "./ExportButtons.jsx";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    department: "",
    position: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingEmployee) {
        // Update employee
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password; // Don't update password if empty
        }
        delete updateData.username; // Don't update username
        
        await updateEmployee(editingEmployee._id, updateData);
        setSuccess("Cập nhật nhân viên thành công!");
      } else {
        // Create new employee
        await createEmployee(formData);
        setSuccess("Tạo nhân viên mới thành công!");
      }
      
      await loadEmployees();
      handleCloseModal();
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      username: employee.username,
      password: "",
      fullName: employee.fullName || "",
      email: employee.email || "",
      department: employee.department || "",
      position: employee.position || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (employee) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa nhân viên "${employee.fullName}"?`)) {
      return;
    }

    try {
      await deleteEmployee(employee._id);
      setSuccess("Xóa nhân viên thành công!");
      await loadEmployees();
    } catch (err) {
      setError(err.message || "Không thể xóa nhân viên");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      username: "",
      password: "",
      fullName: "",
      email: "",
      department: "",
      position: ""
    });
    setError("");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleExportSuccess = (message) => {
    setError("");
    setSuccess(message);
  };

  const handleExportError = (message) => {
    setSuccess("");
    setError(message);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div>Đang tải...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Section */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        marginBottom: "25px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #f1f5f9"
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              background: "#dbeafe",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "18px" }}>👥</span>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>
                Danh sách Nhân viên
              </h2>
              <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
                Tổng cộng {employees.length} nhân viên trong hệ thống
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <ExportButtons 
              employees={employees}
              onSuccess={handleExportSuccess}
              onError={handleExportError}
            />
            
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 6px rgba(59, 130, 246, 0.25)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 15px rgba(59, 130, 246, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.25)";
              }}
            >
              <span style={{ fontSize: "16px" }}>➕</span>
              Thêm Nhân viên
            </button>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div style={{
          background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
          color: "#166534",
          padding: "16px 20px",
          borderRadius: "12px",
          marginBottom: "25px",
          border: "1px solid #bbf7d0",
          boxShadow: "0 4px 6px rgba(34, 197, 94, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{ fontSize: "18px" }}>✅</span>
          {success}
        </div>
      )}

      {error && (
        <div style={{
          background: "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
          color: "#dc2626",
          padding: "16px 20px",
          borderRadius: "12px",
          marginBottom: "25px",
          border: "1px solid #fecaca",
          boxShadow: "0 4px 6px rgba(239, 68, 68, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{ fontSize: "18px" }}>❌</span>
          {error}
        </div>
      )}

      {/* Employee Table */}
      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #f1f5f9",
        overflow: "hidden"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ 
                  padding: "16px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Tên đăng nhập
                </th>
                <th style={{ 
                  padding: "16px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Họ tên
                </th>
                <th style={{ 
                  padding: "16px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Email
                </th>
                <th style={{ 
                  padding: "16px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Phòng ban
                </th>
                <th style={{ 
                  padding: "16px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px",
                  borderBottom: "2px solid #e5e7eb"
                }}>
                  Chức vụ
                </th>
                <th style={{ 
                  padding: "16px", 
                  textAlign: "center", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px",
                  borderBottom: "2px solid #e5e7eb",
                  width: "150px"
                }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ 
                    padding: "60px", 
                    textAlign: "center", 
                    color: "#6b7280" 
                  }}>
                    <div style={{ marginBottom: "15px", fontSize: "48px" }}>👥</div>
                    <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
                      Chưa có nhân viên nào
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      Nhấn "Thêm Nhân viên" để bắt đầu
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((employee, index) => (
                  <tr 
                    key={employee._id} 
                    style={{ 
                      borderBottom: "1px solid #f1f5f9",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'][index % 5]} 0%, ${['#764ba2', '#667eea', '#f5576c', '#f093fb', '#00f2fe'][index % 5]} 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "600",
                          fontSize: "12px"
                        }}>
                          {employee.username.substring(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: "500", color: "#1f2937" }}>
                          {employee.username}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "16px", color: "#4b5563" }}>
                      {employee.fullName || "-"}
                    </td>
                    <td style={{ padding: "16px", color: "#4b5563", fontSize: "14px" }}>
                      {employee.email || "-"}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {employee.department ? (
                        <span style={{
                          background: "#f0f9ff",
                          color: "#0369a1",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {employee.department}
                        </span>
                      ) : (
                        <span style={{ color: "#9ca3af" }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: "16px", color: "#4b5563" }}>
                      {employee.position || "-"}
                    </td>
                    <td style={{ padding: "16px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                        <button
                          onClick={() => handleEdit(employee)}
                          style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "500",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow = "0 4px 8px rgba(245, 158, 11, 0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "none";
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(employee)}
                          style={{
                            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "500",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow = "0 4px 8px rgba(239, 68, 68, 0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "none";
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid #f1f5f9",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
              <div style={{
                background: editingEmployee ? "#fef3c7" : "#dbeafe",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px"
              }}>
                <span style={{ fontSize: "18px" }}>
                  {editingEmployee ? "✏️" : "➕"}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1f2937" }}>
                {editingEmployee ? "Chỉnh sửa Nhân viên" : "Thêm Nhân viên Mới"}
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px"
                }}>
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={editingEmployee}
                  required={!editingEmployee}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    background: editingEmployee ? "#f9fafb" : "white",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => !editingEmployee && (e.target.style.borderColor = "#4f46e5")}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px"
                }}>
                  {editingEmployee ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu *"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingEmployee}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px"
                }}>
                  Họ tên *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px"
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px"
                }}>
                  Phòng ban
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    background: "white",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                >
                  <option value="">Chọn phòng ban</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="IT">IT</option>
                </select>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "14px"
                }}>
                  Chức vụ
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "2px solid #e5e7eb",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "14px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#f3f4f6";
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    boxShadow: "0 4px 6px rgba(59, 130, 246, 0.25)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 6px 12px rgba(59, 130, 246, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.25)";
                  }}
                >
                  {editingEmployee ? "💾 Cập nhật" : "➕ Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}