function EventDetail({ event }) {
    return (
      <>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#003b6f", marginBottom: "1.25rem" }}>
          Event Detail
        </h2>
  
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
          {[
            { label: "Report date", value: event.date },
            { label: "Country", value: event.country },
            { label: "Patient age", value: event.age ?? "Unknown" },
            { label: "Patient sex", value: event.sex },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: "#f8fafc", borderRadius: 8, padding: "0.75rem 1rem", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "#1a2332" }}>{value}</div>
            </div>
          ))}
        </div>
  
        {/* Severity badge */}
        <div style={{ marginBottom: "1.25rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.3rem 0.85rem",
              borderRadius: 999,
              fontSize: "0.8rem",
              fontWeight: 600,
              backgroundColor: event.serious ? "#fee2e2" : "#dcfce7",
              color: event.serious ? "#dc2626" : "#16a34a",
            }}
          >
            {event.serious ? "⚠ Serious event" : "✓ Non-serious event"}
          </span>
        </div>
  
        {/* Reactions */}
        <div>
          <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Reported reactions
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {event.reactions.map((r, i) => (
              <span
                key={i}
                style={{
                  padding: "0.25rem 0.7rem",
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  borderRadius: 999,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  border: "1px solid #bfdbfe",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }
  
  export default EventDetail;