import { useState, useEffect } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api.js";

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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div>Đang tải...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "20px" 
      }}>
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
          Quản lý Nhân viên
        </h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500"
          }}
        >
          + Thêm Nhân viên
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div style={{
          background: "#dcfce7",
          color: "#166534",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #bbf7d0"
        }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{
          background: "#fef2f2",
          color: "#dc2626",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #fecaca"
        }}>
          {error}
        </div>
      )}

      {/* Employee Table */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>
                Tên đăng nhập
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>
                Họ tên
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>
                Email
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>
                Phòng ban
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>
                Chức vụ
              </th>
              <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ 
                  padding: "40px", 
                  textAlign: "center", 
                  color: "#6b7280" 
                }}>
                  Chưa có nhân viên nào
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee._id} style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px" }}>{employee.username}</td>
                  <td style={{ padding: "12px" }}>{employee.fullName || "-"}</td>
                  <td style={{ padding: "12px" }}>{employee.email || "-"}</td>
                  <td style={{ padding: "12px" }}>{employee.department || "-"}</td>
                  <td style={{ padding: "12px" }}>{employee.position || "-"}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => handleEdit(employee)}
                      style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px",
                        fontSize: "14px"
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(employee)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px"
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            width: "100%",
            maxWidth: "500px",
            margin: "20px"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "bold" }}>
              {editingEmployee ? "Chỉnh sửa Nhân viên" : "Thêm Nhân viên Mới"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={editingEmployee} // Can't change username when editing
                  required={!editingEmployee}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    background: editingEmployee ? "#f9fafb" : "white"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
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
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
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
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
                  Phòng ban
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
                  Chức vụ
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: "#6b7280",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                >
                  {editingEmployee ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}