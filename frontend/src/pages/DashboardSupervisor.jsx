import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authHeader } from "../api";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import EmployeeTable from "../components/EmployeeTable";
import AssessmentModal from "../components/AssessmentModal";
import { calcAvgScore } from "../utils/performanceLabel";

export default function DashboardSupervisor() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:4000/api/employees", { headers: authHeader() });
      const employees = await res.json();

      for (let emp of employees) {
        const r = await fetch(`http://localhost:4000/api/assessments/employee/${emp._id}`, {
          headers: authHeader()
        });
        const list = await r.json();
        emp.assessments = list;
        emp.avgScore = calcAvgScore(list);
        emp.reviewCount = list.length;
      }

      setEmployees(employees);
      setFiltered(employees);
    }

    fetchData();
  }, []);

  useEffect(() => {
    let data = employees;
    if (search) data = data.filter(e => e.fullName.toLowerCase().includes(search.toLowerCase()));
    if (dept) data = data.filter(e => e.department === dept);
    setFiltered(data);
  }, [search, dept, employees]);

// Lọc nhân viên có điểm trung bình
const employeesWithScore = employees.filter(e => e.avgScore != null);

// Tính điểm trung bình của tất cả nhân viên
const overallAvg = employeesWithScore.length > 0
  ? (employeesWithScore.reduce((sum, e) => sum + e.avgScore, 0) / employeesWithScore.length).toFixed(2)
  : "-";

const stats = {
  total: employees.length,
  recent: 1,
  avg: overallAvg + (overallAvg >= 4 ? " ⭐" : ""),
  excellent: employeesWithScore.filter(e => e.avgScore >= 4).length
};


  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>
        <StatsCards stats={stats} />
        <SearchBar search={search} setSearch={setSearch} dept={dept} setDept={setDept} />

        <EmployeeTable
          employees={filtered}
          onEvaluate={emp => setSelected(emp)}
        />

        {/* Quick Actions */}
        <div style={{ 
          marginTop: "20px", 
          display: "flex", 
          gap: "12px", 
          justifyContent: "center" 
        }}>
          <Link 
            to="/criteria-admin" 
            style={{
              background: "#8b5cf6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ⚙️ Quản lý Tiêu chí Đánh giá
          </Link>
          <Link 
            to="/employee-management" 
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            👥 Quản lý Nhân viên
          </Link>
        </div>
      </div>

      {selected && (
        <AssessmentModal
          open={true}
          employee={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
