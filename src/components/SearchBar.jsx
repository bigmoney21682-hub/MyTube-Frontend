import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search YouTube..."
        style={{
          padding: "12px",
          width: "70%",
          maxWidth: "500px",
          fontSize: "1.2rem",
          borderRadius: "8px 0 0 8px",
          border: "none"
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px 20px",
          fontSize: "1.2rem",
          borderRadius: "0 8px 8px 0",
          border: "none",
          background: "#ff0000",
          color: "white"
        }}
      >
        Search
      </button>
    </form>
  );
}
