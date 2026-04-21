import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
  } from "recharts";
  
  function ReactionChart({ events }) {
    const counts = {};
    events.forEach((e) => {
      e.reactions.forEach((r) => {
        counts[r] = (counts[r] || 0) + 1;
      });
    });
  
    const data = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  
    return (
      <div>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#003b6f", marginBottom: "1.25rem" }}>
          Top 10 Reported Reactions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {data.map((entry, index) => {
            const max = data[0].count;
            const pct = (entry.count / max) * 100;
            const color = index === 0 ? "#0077cc" : index < 3 ? "#3b9edd" : "#93c5fd";
            return (
              <div key={entry.name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                  <span style={{ color: "#1a2332", fontWeight: 500 }}>{entry.name}</span>
                  <span style={{ color: "#64748b" }}>{entry.count}</span>
                </div>
                <div style={{ backgroundColor: "#f1f5f9", borderRadius: 999, height: 10, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      backgroundColor: color,
                      borderRadius: 999,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default ReactionChart;