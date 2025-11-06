import Navbar from "../components/Navbar";
import EmployeeManagement from "../components/EmployeeManagement";

export default function EmployeeManagementPage() {
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />
      <EmployeeManagement />
    </div>
  );
}