// src/components/Header.jsx

import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #222",
        background: "#0a0a0a",
      }}
    >
      {/* Top row: Menu | Title | Playlist */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        {/* Menu button */}
        <button
          style={{ opacity: 0.7, fontSize: "1.4rem", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => navigate("/settings")}
        >
          ☰
        </button>

        {/* Title + wider subtitle */}
        <div
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            textAlign: "center",
            flex: 1,
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.8rem",
              background: "linear-gradient(90deg, #ff8c00, #ff4500, #ff0000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🔥 MyTube 🔥
          </h1>

          <p
            style={{
              margin: "8px auto 0",
              fontSize: "0.85rem",
              opacity: 0.85,
              maxWidth: "80vw",  // Much wider, responsive
              lineHeight: 1.4,
              color: "#ccc",
            }}
          >
            No Ads • No Tracking • Free Premium Features • Background Playback • 4K Support
          </p>
        </div>

        {/* Playlist button */}
        <button
          style={{ opacity: 0.7, fontSize: "1.4rem", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => navigate("/playlists")}
        >
          ▶︎ Playlists
        </button>
      </div>

      {/* Search bar with custom styling and red button */}
      {onSearch && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            maxWidth: "90vw",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              flex: 1,
              maxWidth: "600px",
              display: "flex",
              background: "linear-gradient(to right, #ffffff, #e0e0e0)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <SearchBar
              onSearch={onSearch}
              style={{ flex: 1, border: "none", background: "transparent" }}
            />
            <button
              style={{
                background: "#ff0000",
                color: "white",
                border: "none",
                padding: "0 20px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "0 8px 8px 0",
              }}
              onClick={() => {
                const input = document.querySelector('input[placeholder="Search videos..."]');
                if (input && input.value.trim()) {
                  onSearch(input.value.trim());
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
