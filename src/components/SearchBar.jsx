import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a drug name e.g. aspirin, ibuprofen..."
        style={{
          flex: 1,
          padding: "0.65rem 1rem",
          fontSize: "0.95rem",
          border: "1.5px solid #cbd5e1",
          borderRadius: "8px",
          outline: "none",
          color: "#1a2332",
          backgroundColor: "#f8fafc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.65rem 1.5rem",
          fontSize: "0.95rem",
          fontWeight: 600,
          backgroundColor: "#0077cc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;