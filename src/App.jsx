import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Timeline from "./components/Timeline";
import EventDetail from "./components/EventDetail";
import ReactionChart from "./components/ReactionChart";
import CountryChart from "./components/CountryChart";
import SeverityTrendChart from "./components/SeverityTrendChart";
import ResearchPanel from "./components/ResearchPanel";

function App() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drugName, setDrugName] = useState("");

  async function handleSearch(drug) {
    setLoading(true);
    setSelected(null);
    setDrugName(drug);
    try {
      const res = await fetch(
        `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${drug}"&limit=100`
      );
      const data = await res.json();
      const parsed = data.results.map((r, i) => ({
        id: i,
        date: r.receivedate ? `${r.receivedate.slice(4,6)}/${r.receivedate.slice(6,8)}/${r.receivedate.slice(0,4)}` : "Unknown",
        outcome: r.patient?.reaction?.[0]?.reactionmeddrapt || "Unknown reaction",
        serious: r.serious == 1,
        reactions: r.patient?.reaction?.map((rx) => rx.reactionmeddrapt) || [],
        country: r.occurcountry || "Unknown",
        age: r.patient?.patientonsetage || null,
        sex: r.patient?.patientsex === "1" ? "Male" : r.patient?.patientsex === "2" ? "Female" : "Unknown",
      }));
      setEvents(parsed);
    } catch (e) {
      alert("No results found. Try a common drug like aspirin or ibuprofen.");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#003b6f", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 36, height: 36, backgroundColor: "#0077cc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>+</span>
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 600, fontSize: "1.1rem" }}>ClinicalTrace</div>
          <div style={{ color: "#90b8d8", fontSize: "0.75rem" }}>Adverse Event Intelligence</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Search card */}
        <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#003b6f", marginBottom: "0.25rem" }}>
            Drug Adverse Event Timeline
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
            Search any drug to visualize FDA-reported adverse events over time.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748b", fontSize: "0.9rem" }}>
            Fetching reports...
          </div>
        )}

        {events.length > 0 && (
          <>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ backgroundColor: "white", borderRadius: 10, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem" }}>Total reports</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#003b6f" }}>{events.length}</div>
              </div>
              <div style={{ backgroundColor: "white", borderRadius: 10, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem" }}>Serious events</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#dc2626" }}>
                  {events.filter((e) => e.serious).length}
                </div>
              </div>
              <div style={{ backgroundColor: "white", borderRadius: 10, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem" }}>Drug searched</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#003b6f", textTransform: "capitalize" }}>{drugName}</div>
              </div>
            </div>

            {/* Timeline card */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "1.5rem" }}>
              <Timeline events={events} onSelect={setSelected} />
            </div>

            {/* Two column charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <ReactionChart events={events} />
            </div>
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                <CountryChart events={events} />
              </div>
            </div>

            {/* Severity trend */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "1.5rem" }}>
              <SeverityTrendChart events={events} />
            </div>
            {/* Research panel */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "1.5rem" }}>
              <ResearchPanel drugName={drugName} />
            </div>

            {/* Detail card */}
            {selected && (
              <div style={{ backgroundColor: "white", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                <EventDetail event={selected} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
