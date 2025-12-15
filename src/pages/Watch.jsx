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
    let cancelled = false;

    (async () => {
      try {
        setError("");
        setVideo(null);
        setStream("");

        // ================= VIDEO =================
        const res = await fetch(`${API_BASE}/video/${id}`);
        if (!res.ok) throw new Error("Failed to load video");

        const data = await res.json();
        if (!data || !Array.isArray(data.formats)) {
          throw new Error("Invalid video data");
        }

        if (cancelled) return;
        setVideo(data);

        // Pick fast, iOS-friendly stream
        const best = data.formats
          .filter(
            f =>
              f.ext === "mp4" &&
              f.vcodec !== "none" &&
              (f.height || 0) <= 720
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        if (!best?.url) throw new Error("No playable stream found");
        setStream(best.url);

        // ================= RELATED (optional) =================
        try {
          const rel = await fetch(`${API_BASE}/related/${id}`);
          if (rel.ok) {
            const relData = await rel.json();
            if (!cancelled && Array.isArray(relData)) setRelated(relData);
          }
        } catch {
          setRelated([]);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <p style={{ padding: "1rem" }}>Error: {error}</p>;
  if (!video) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <div>
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
