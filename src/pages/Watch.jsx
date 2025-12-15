// src/pages/Watch.jsx
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

  useEffect(() => {
    (async () => {
      try {
        // Fetch video
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        const data = await res.json();

        if (!data || !Array.isArray(data.formats))
          throw new Error("Invalid video data");

        setVideo(data);

        // Pick best playable stream (mobile-friendly)
        const best = data.formats
          .filter(f => f.ext === "mp4" && f.vcodec !== "none" && (f.height || 0) <= 720)
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        if (!best?.url) throw new Error("No playable stream found");
        setStream(best.url);

        // Fetch related videos if backend supports it
        try {
          const relRes = await fetch(`${API_BASE}/related?id=${id}`);
          if (relRes.ok) {
            const relData = await relRes.json();
            setRelated(relData);
          } else {
            console.warn("Related videos not available for this video");
          }
        } catch (err) {
          console.warn("Failed to fetch related videos", err);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    })();
  }, [id]);

  if (error)
    return <p style={{ padding: "1rem", color: "red" }}>Error: {error}</p>;
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
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
