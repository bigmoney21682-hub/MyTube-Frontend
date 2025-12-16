import { usePlaylists } from "./PlaylistContext";

export default function VideoCard({ video, onClick }) {
  const { addToPlaylist } = usePlaylists();

  return (
    <div style={{ marginBottom: 12 }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        onClick={onClick}
        style={{ width: "100%", cursor: "pointer" }}
      />

      <h4>{video.title}</h4>

      <button onClick={() => addToPlaylist(0, video)}>
        ➕ Playlist
      </button>
    </div>
  );
}
