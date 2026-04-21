import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
  } from "recharts";
  
  function Timeline({ events, onSelect }) {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  
    const data = sorted.map((e) => ({
      ...e,
      x: e.date,
      y: 1,
    }));
  
    return (
        <div style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#aaa" }}>
            Event Timeline — click any dot to see details
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 40, right: 30, left: 10, bottom: 30 }}>
              <XAxis
                dataKey="x"
                name="Date"
                tick={{ fontSize: 11, fill: "#aaa" }}
                interval="preserveStartEnd"
                label={{ value: "Report date", position: "insideBottom", offset: -15, fontSize: 12, fill: "#aaa" }}
              />
              <YAxis dataKey="y" domain={[0, 2]} hide />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const e = payload[0].payload;
                  return (
                    <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "0.5rem", borderRadius: 6, fontSize: 13, color: "#fff" }}>
                      <div><strong>{e.date}</strong></div>
                      <div>{e.outcome}</div>
                      <div style={{ color: e.serious ? "#f87171" : "#60a5fa" }}>
                        {e.serious ? "Serious" : "Non-serious"}
                      </div>
                    </div>
                  );
                }}
              />
              <Scatter data={data} onClick={(d) => onSelect(d)}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.serious ? "#f87171" : "#60a5fa"}
                    opacity={0.9}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
    
          <div style={{ display: "flex", gap: "1rem", fontSize: 12, color: "#aaa", marginTop: "0.25rem" }}>
            <span><span style={{ color: "#f87171" }}>●</span> Serious</span>
            <span><span style={{ color: "#60a5fa" }}>●</span> Non-serious</span>
          </div>
        </div>
      );
  }
  
  export default Timeline;