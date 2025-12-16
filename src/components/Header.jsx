import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        background: "#111",
        color: "#ff9800",
        borderBottom: "1px solid #222"
      }}
    >
      <div>
        <h1 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
          MyTube
        </h1>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#ccc" }}>
          Your videos, your way
        </p>
      </div>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            border: "1px solid #333",
            background: "#222",
            color: "#fff"
          }}
        />
        <button type="submit" style={{ padding: "0.25rem 0.5rem" }}>
          🔍
        </button>
      </form>

      <button
        onClick={() => navigate("/playlist")}
        style={{
          padding: "0.3rem 0.6rem",
          background: "#222",
          color: "#ff9800",
          border: "1px solid #333",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        📜 Playlist
      </button>
    </header>
  );
}
