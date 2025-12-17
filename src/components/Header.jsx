import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#000",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong style={{ color: "#fff" }}>MyTube</strong>
        <button onClick={() => navigate("/playlist")}>
          📂 Playlist
        </button>
      </div>

      <SearchBar onSearch={onSearch} />
    </div>
  );
}
