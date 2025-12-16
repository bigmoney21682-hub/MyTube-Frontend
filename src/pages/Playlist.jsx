import { useNavigate } from "react-router-dom";
import { usePlaylists } from "../components/PlaylistContext";
import VideoCard from "../components/VideoCard";

export default function Playlist() {
  const navigate = useNavigate();
  const { currentPlaylist } = usePlaylists();

  if (!currentPlaylist || currentPlaylist.videos.length === 0) {
    return <p style={{ padding: 16 }}>Playlist is empty</p>;
  }

  return (
    <div style={{ padding: 12 }}>
      <h2>{currentPlaylist.name}</h2>

      {currentPlaylist.videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() =>
            navigate(`/watch/${video.id}?pl=1&index=${index}`)
          }
        />
      ))}
    </div>
  );
}
