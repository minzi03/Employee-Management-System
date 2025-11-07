export default function SearchBar({ search, setSearch, dept, setDept }) {
  return (
    <div style={{ 
      display: "flex", 
      gap: "15px", 
      flexWrap: "wrap",
      alignItems: "center"
    }}>
      <div style={{ flex: 1, minWidth: "250px", position: "relative" }}>
        <div style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
          fontSize: "16px"
        }}>
          🔍
        </div>
        <input
          placeholder="Tìm kiếm nhân viên..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            border: "2px solid #e5e7eb",
            padding: "12px 15px 12px 45px",
            borderRadius: "10px",
            fontSize: "14px",
            transition: "all 0.2s ease",
            outline: "none",
            background: "white"
          }}
          onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
          onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
        />
      </div>

      <div style={{ position: "relative", minWidth: "180px" }}>
        <div style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
          fontSize: "16px"
        }}>
          🏢
        </div>
        <select
          value={dept}
          onChange={e => setDept(e.target.value)}
          style={{
            width: "100%",
            border: "2px solid #e5e7eb",
            padding: "12px 15px 12px 45px",
            borderRadius: "10px",
            fontSize: "14px",
            background: "white",
            transition: "all 0.2s ease",
            outline: "none",
            cursor: "pointer"
          }}
          onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
          onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
        >
          <option value="">Tất cả phòng ban</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Analytics">Analytics</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>
    </div>
  );
}
