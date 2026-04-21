import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  function SeverityTrendChart({ events }) {
    const byDate = {};
    events.forEach((e) => {
      if (!byDate[e.date]) byDate[e.date] = { date: e.date, serious: 0, nonSerious: 0 };
      if (e.serious) byDate[e.date].serious += 1;
      else byDate[e.date].nonSerious += 1;
    });
  
    const data = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
  
    return (
      <div>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#003b6f", marginBottom: "1.25rem" }}>
          Serious vs Non-serious Over Time
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 20 }}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748b" }}
              interval="preserveStartEnd"
              label={{ value: "Report date", position: "insideBottom", offset: -12, fontSize: 12, fill: "#64748b" }}
            />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} allowDecimals={false} />
            <Tooltip
              content={({ payload, label }) => {
                if (!payload?.length) return null;
                return (
                  <div style={{ background: "white", border: "1px solid #e2e8f0", padding: "0.5rem 0.75rem", borderRadius: 6, fontSize: 13 }}>
                    <div style={{ fontWeight: 600, color: "#003b6f", marginBottom: "0.25rem" }}>{label}</div>
                    {payload.map((p) => (
                      <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
                    ))}
                  </div>
                );
              }}
            />
            <Legend verticalAlign="top" height={32} />
            <Line type="monotone" dataKey="serious" stroke="#dc2626" strokeWidth={2} dot={false} name="Serious" />
            <Line type="monotone" dataKey="nonSerious" stroke="#0077cc" strokeWidth={2} dot={false} name="Non-serious" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default SeverityTrendChart;
  