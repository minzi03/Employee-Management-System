import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

/**
 * props:
 *  - items: mảng assessments [{ cycleLabel, overall, createdAt }]
 *  - height: number (optional)
 *  - title: string (optional)
 */
export default function PerformanceChart({ items, height = 350, title = "Xu hướng Hiệu suất" }) {
  // sort theo thời gian tăng dần (cũ -> mới)
  const data = [...(items || [])]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((a, i) => ({
      idx: i + 1,
      label: a.cycleLabel || `#${i + 1}`,
      overall: Number(a.overall || 0)
    }));

  if (!data.length) {
    return (
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #f1f5f9"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
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
            <span style={{ fontSize: "18px" }}>📈</span>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
              {title}
            </h3>
            <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
              Biểu đồ theo dõi điểm số qua thời gian
            </p>
          </div>
        </div>
        
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px",
          color: "#6b7280"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>📊</div>
          <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
            Chưa có dữ liệu đánh giá
          </div>
          <div style={{ fontSize: "14px" }}>
            Dữ liệu biểu đồ sẽ hiển thị khi có đánh giá đầu tiên
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "30px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
      border: "1px solid #f1f5f9"
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
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
          <span style={{ fontSize: "18px" }}>📈</span>
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>
            {title}
          </h3>
          <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
            Biểu đồ theo dõi {data.length} kỳ đánh giá
          </p>
        </div>
      </div>
      
      <div style={{ 
        background: "#f8fafc",
        borderRadius: "12px",
        padding: "20px"
      }}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              domain={[0, 5]} 
              ticks={[0, 1, 2, 3, 4, 5]} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              formatter={(v) => [`${v}/5`, "Điểm số"]} 
              labelFormatter={(l) => `Kỳ đánh giá: ${l}`}
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="overall"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
