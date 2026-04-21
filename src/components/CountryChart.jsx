import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
  } from "recharts";
  
  function CountryChart({ events }) {
    const counts = {};
    events.forEach((e) => {
      const c = e.country || "Unknown";
      counts[c] = (counts[c] || 0) + 1;
    });
  
    const data = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  
    return (
      <div>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#003b6f", marginBottom: "1.25rem" }}>
          Reports by Country
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#1a2332" }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "#f1f5f9" }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                return (
                  <div style={{ background: "white", border: "1px solid #e2e8f0", padding: "0.5rem 0.75rem", borderRadius: 6, fontSize: 13 }}>
                    <div style={{ fontWeight: 600, color: "#003b6f" }}>{payload[0].payload.name}</div>
                    <div style={{ color: "#64748b" }}>{payload[0].value} reports</div>
                  </div>
                );
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={index === 0 ? "#0077cc" : index < 3 ? "#3b9edd" : "#93c5fd"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default CountryChart;