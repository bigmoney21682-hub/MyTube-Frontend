import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  const navigate = useNavigate();

  return (
    <header style={{ padding: "12px", borderBottom: "1px solid #222" }}>
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left placeholder */}
        <button style={{ opacity: 0.6 }}>☰</button>

        {/* Title */}
        <div
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            textAlign: "center",
            flex: 1,
          }}
        >
          <h1 style={{ margin: 0 }}>🔥 MyTube 🔥</h1>
          <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>
            No Ads • No Tracking • Free Premium Features • Background Playback • Unlimited Custom Playlists • No Connection to Google's Servers • 4K Support
          </p>
        </div>

        {/* Right placeholder */}
        <button style={{ opacity: 0.6 }}>▶︎</button>
      </div>

      {/* Search BELOW title */}
      {onSearch && (
        <div style={{ marginTop: "10px" }}>
          <SearchBar onSearch={onSearch} />
        </div>
      )}
    </header>
  );
}
