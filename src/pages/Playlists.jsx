// src/pages/Playlists.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Playlists() {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState(() => {
    return JSON.parse(localStorage.getItem("mytube_playlists")) || [
      { id: crypto.randomUUID(), name: "Favorites", videos: [] },
    ];
  });

  function save(p) {
    setPlaylists(p);
    localStorage.setItem("mytube_playlists", JSON.stringify(p));
  }

  function addPlaylist() {
    const name = prompt("Playlist name?");
    if (!name) return;
    save([...playlists, { id: crypto.randomUUID(), name, videos: [] }]);
  }

  function rename(id) {
    const name = prompt("New name?");
    if (!name) return;
    save(playlists.map(p => p.id === id ? { ...p, name } : p));
  }

  function remove(id) {
    if (!confirm("Delete playlist?")) return;
    save(playlists.filter(p => p.id !== id));
  }

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
            <strong onClick={() => navigate(`/playlist/${p.id}`)}>
              {p.name}
            </strong>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => rename(p.id)}>✏️</button>{" "}
              <button onClick={() => remove(p.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
