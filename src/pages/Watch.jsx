import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  // Helper: fetch video details and select best stream
  const loadVideo = async (videoId) => {
    try {
      const res = await fetch(`${API_BASE}/video?id=${videoId}`);
      const data = await res.json();
      if (!data || !Array.isArray(data.formats)) throw new Error("Invalid video data");

      const best = data.formats
        .filter(f => f.ext === "mp4" && f.vcodec !== "none" && (f.height || 0) <= 480)
        .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

      if (!best?.url) throw new Error("No playable stream found");

      setVideo(data);
      setStream(best.url);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Load video on initial render
  useEffect(() => {
    loadVideo(id);

    // Fetch related videos
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/related?id=${id}`);
        const data = await res.json();
        setRelated(data);
      } catch (err) {
        console.error("Failed to fetch related videos", err);
      }
    })();
  }, [id]);

  if (error) return <p style={{ padding: "1rem" }}>Error: {error}</p>;
  if (!video) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <div className="watch-page">
      <div className="player-container">
        <h2>{video.title}</h2>
        <Player src={stream} />
      </div>

      {related.length > 0 && (
        <div className="related-videos">
          <h3>Related Videos</h3>
          <div className="grid">
            {related.map(v => (
              <div
                key={v.id}
                onClick={() => loadVideo(v.id)} // CLICKABLE RELATED VIDEO
                style={{ cursor: "pointer" }}
              >
                <VideoCard video={v} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
