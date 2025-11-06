const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

/**
 * ===========================================================
 * 🔧 Helper: gọi API với xử lý lỗi + tự động header Authorization
 * ===========================================================
 */
async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || `❌ Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

/**
 * ===========================================================
 * 🧠 AUTH
 * ===========================================================
 */
export async function login(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getCurrentUser() {
  return request("/auth/me", { method: "GET" });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * ===========================================================
 * 👥 EMPLOYEES
 * ===========================================================
 */
export async function getEmployees() {
  return request("/employees", { method: "GET" });
}

export async function getEmployeeById(id) {
  return request(`/employees/${id}`, { method: "GET" });
}

export async function createEmployee(employeeData) {
  return request("/employees", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });
}

export async function updateEmployee(id, employeeData) {
  return request(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(employeeData),
  });
}

export async function deleteEmployee(id) {
  return request(`/employees/${id}`, { method: "DELETE" });
}

/**
 * ===========================================================
 * 🧾 ASSESSMENTS
 * ===========================================================
 */
export async function getMyAssessments() {
  return request("/assessments/me", { method: "GET" });
}

export async function getEmployeeAssessments(employeeId) {
  return request(`/assessments/employee/${employeeId}`, { method: "GET" });
}

export async function getAssessmentById(id) {
  return request(`/assessments/${id}`, { method: "GET" });
}

export async function createAssessment(payload) {
  return request("/assessments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAssessment(id, payload) {
  return request(`/assessments/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAssessment(id) {
  return request(`/assessments/${id}`, { method: "DELETE" });
}

/**
 * ===========================================================
 * 📊 CRITERIA MANAGEMENT
 * ===========================================================
 */
export async function getCriteria(department = null) {
  const url = department ? `/criteria?department=${encodeURIComponent(department)}` : "/criteria";
  return request(url, { method: "GET" });
}

export async function getAllCriteria() {
  return request("/criteria/all", { method: "GET" });
}

export async function getDepartments() {
  return request("/criteria/departments", { method: "GET" });
}

export async function createCriteriaSet(version, list, department = null) {
  return request("/criteria", {
    method: "POST",
    body: JSON.stringify({ version, list, department }),
  });
}

export async function updateCriteria(id, payload) {
  return request(`/criteria/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteCriteria(id) {
  return request(`/criteria/${id}`, { method: "DELETE" });
}

/**
 * ===========================================================
 * 🔁 CRITERIA VERSION ACTIVATION (NEW)
 * ===========================================================
 * 👉 Cho phép admin/supervisor chuyển đổi version tiêu chí
 */
export async function activateCriteriaVersion(version) {
  return request(`/criteria/activate/${version}`, {
    method: "PUT",
  });
}

/**
 * 👉 Tuỳ chọn: nếu bạn muốn tạm "Deactivate" toàn bộ (không active version nào)
 * — route này chỉ cần nếu backend có /criteria/deactivate
 */
export async function deactivateAllCriteria() {
  return request(`/criteria/deactivate`, { method: "PUT" });
}

/**
 * ===========================================================
 * 📦 EXPORT DEFAULT
 * ===========================================================
 */
export default {
  // Auth
  login,
  getCurrentUser,
  logout,

  // Employees
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,

  // Assessments
  getMyAssessments,
  getEmployeeAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,

  // Criteria
  getCriteria,
  getAllCriteria,
  getDepartments,
  createCriteriaSet,
  updateCriteria,
  deleteCriteria,

  // Criteria activation
  activateCriteriaVersion,
  deactivateAllCriteria,
};
