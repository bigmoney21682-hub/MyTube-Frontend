// src/components/Header.jsx

import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  const navigate = useNavigate();

  return (
    <header style={{ padding: "10px 12px", borderBottom: "1px solid #222" }}>
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Menu */}
        <button
          style={{ opacity: 0.7, marginTop: -4 }}
          onClick={() => navigate("/settings")}
        >
          ☰
        </button>

        {/* Title + subtitle */}
        <div
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            textAlign: "center",
            flex: 1,
            padding: "0 10px",
          }}
        >
          <h1 style={{ margin: 0 }}>🔥 MyTube 🔥</h1>

          <p
            style={{
              margin: "4px auto 0",
              fontSize: "0.8rem",
              opacity: 0.8,
              maxWidth: "90%",
              lineHeight: 1.3,
            }}
          >
            No Ads • No Tracking • Free Premium Features • Background Playback • Unlimited Custom Playlists • No Connection to Google's Servers • 4K Support
          </p>
        </div>

        {/* Playlist */}
        <button
          style={{ opacity: 0.7, marginTop: -4 }}
          onClick={() => navigate("/playlists")}
        >
          ▶︎
        </button>
      </div>

      {/* Search BELOW title */}
      {onSearch && (
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
          <SearchBar onSearch={onSearch} />
        </div>
      )}
    </header>
  );
}
