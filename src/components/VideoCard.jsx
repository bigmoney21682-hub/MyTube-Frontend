import { useNavigate } from "react-router-dom";
import { usePlaylists } from "./PlaylistContext";

export default function VideoCard({ video, onClick }) {
  const navigate = useNavigate();
  const { addToPlaylist } = usePlaylists();

  const handleClick = () => {
    if (onClick) return onClick();
    navigate(`/watch/${video.id}`);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        onClick={handleClick}
        style={{
          width: "100%",
          cursor: "pointer",
          borderRadius: 8
        }}
      />

      <h4 style={{ margin: "8px 0" }}>{video.title}</h4>

      <button onClick={() => addToPlaylist(0, video)}>
        ➕ Playlist
      </button>
    </div>
  );
}
