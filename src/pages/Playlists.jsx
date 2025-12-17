// src/pages/Playlists.jsx

import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../components/PlaylistContext";

export default function Playlists() {
  const navigate = useNavigate();
  const { playlists, setCurrentPlaylist, addPlaylist, renamePlaylist, deletePlaylist } =
    usePlaylists();

  return (
    <div style={{ padding: 16 }}>
      <h2>📁 Playlists</h2>

      <button onClick={addPlaylist}>➕ New Playlist</button>

      <div style={{ marginTop: 16 }}>
        {playlists.map(p => (
          <div
            key={p.id}
            style={{
              padding: 12,
              marginBottom: 10,
              background: "#111",
              borderRadius: 8,
            }}
          >
            <strong
              onClick={() => {
                setCurrentPlaylist(p);
                navigate(`/playlist/${p.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              {p.name}
            </strong>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => renamePlaylist(p.id)}>✏️</button>{" "}
              <button onClick={() => deletePlaylist(p.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
