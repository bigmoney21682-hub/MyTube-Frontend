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
    if (!id) return setError("No video ID provided");

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/video?id=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();

        if (!data || !Array.isArray(data.formats)) throw new Error("Invalid video data");

        setVideo(data);

        // Pick the best mobile-friendly stream
        const best = data.formats
          .filter(f => f.ext === "mp4" && f.vcodec !== "none" && (f.height || 0) <= 720)
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        if (!best?.url) throw new Error("No playable stream found");

        // Make sure it's a valid URL
        try {
          new URL(best.url);
        } catch {
          throw new Error("Stream URL is invalid");
        }

        setStream(best.url);

        // Fetch related videos
        const rel = await fetch(`${API_BASE}/related?id=${encodeURIComponent(id)}`);
        if (rel.ok) {
          const relData = await rel.json();
          setRelated(relData);
        }

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    })();
  }, [id]);

  if (error) return <p style={{ padding: "1rem" }}>Error: {error}</p>;
  if (!video) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <div>
      <div className="player-container">
        <h2>{video.title}</h2>
        {stream ? <Player src={stream} /> : <p>Loading stream...</p>}
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
