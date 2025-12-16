// File: src/components/VideoCard.jsx (or wherever your existing one is)

import { useNavigate } from "react-router-dom";
import { usePlaylists } from "./PlaylistContext";  // Adjust path if components folder is different
import { useState } from "react";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const { playlists, addToPlaylist } = usePlaylists();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddToPlaylist = (e) => {
    const playlistIndex = parseInt(e.target.value);
    if (playlistIndex >= 0) {
      addToPlaylist(playlistIndex, video);
    }
    setShowDropdown(false);
  };

  return (
    <div className="video-card" style={{ position: "relative" }}>
      <div onClick={() => navigate(`/watch/${video.id}`)} style={{ cursor: "pointer" }}>
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/fallback.jpg";
          }}
          style={{ width: "100%" }}
        />

        <div style={{ padding: "0.5rem" }}>
          <h4>{video.title}</h4>
          <p>{video.uploader}</p>
        </div>
      </div>

      {/* Add to Playlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigating to watch page
          setShowDropdown(!showDropdown);
        }}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
          fontSize: "0.8rem"
        }}
      >
        + Playlist
      </button>

      {showDropdown && (
        <select
          onChange={handleAddToPlaylist}
          onClick={(e) => e.stopPropagation()}
          onBlur={() => setShowDropdown(false)}
          autoFocus
          style={{
            position: "absolute",
            top: "40px",
            right: "8px",
            zIndex: 10,
            background: "#fff",
            color: "#000"
          }}
        >
          <option value="">Select playlist...</option>
          {playlists.map((pl, index) => (
            <option key={index} value={index}>
              {pl.name} ({pl.videos.length})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
