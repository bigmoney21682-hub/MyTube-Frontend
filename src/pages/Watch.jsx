import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Watch() {
  const { id: paramId } = useParams();
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");
  const [related, setRelated] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const currentId = playlist.length ? playlist[currentIndex].id : paramId;

  // Load video and stream
  useEffect(() => {
    (async () => {
      if (!currentId) return;

      try {
        const res = await fetch(`${API_BASE}/video?id=${currentId}`);
        const data = await res.json();

        if (!data || !Array.isArray(data.formats)) throw new Error("Invalid video data");

        setVideo(data);

        const best = data.formats
          .filter(f => f.ext === "mp4" && f.vcodec !== "none" && (f.height || 0) <= 720)
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        if (!best?.url) throw new Error("No playable stream found");

        setStream(best.url);

        // Load related videos
        const rel = await fetch(`${API_BASE}/related?id=${currentId}`);
        const relData = await rel.json();
        setRelated(relData);

        // Initialize playlist if empty
        if (!playlist.length) setPlaylist([data, ...relData]);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    })();
  }, [currentId]);

  function nextVideo() {
    if (currentIndex < playlist.length - 1) setCurrentIndex(currentIndex + 1);
  }

  function prevVideo() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  if (error) return <p style={{ padding: "1rem" }}>Error: {error}</p>;
  if (!video) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <div className="watch-page">
      <div className="player-container">
        <h2>{video.title}</h2>
        {stream && <Player src={stream} />}
        <div className="playlist-controls">
          <button onClick={prevVideo} disabled={currentIndex === 0}>
            ◀ Prev
          </button>
          <button onClick={nextVideo} disabled={currentIndex === playlist.length - 1}>
            Next ▶
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-videos">
          <h3>Related Videos</h3>
          <div className="grid">
            {related.map(v => v.id && <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      )}
    </div>
  );
}
