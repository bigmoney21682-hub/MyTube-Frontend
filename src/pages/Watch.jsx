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
        setRelated([]);

        /* ========== VIDEO ========== */
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("Video unavailable");

        const data = await res.json();
        if (!data?.formats) throw new Error("Invalid video data");
        if (cancelled) return;

        setVideo(data);

  const candidates = data.formats
  .filter(f => f.url && (f.ext === "mp4" || f.ext === "webm"))
  .sort((a, b) => (b.height || 0) - (a.height || 0));

if (!candidates.length) throw new Error("No playable stream found");

setStream(candidates[0].url);

        /* ========== RELATED (NON-BLOCKING) ========== */
        try {
          const rel = await fetch(`${API_BASE}/related?id=${id}`);
          if (rel.ok) {
            const relData = await rel.json();
            if (!cancelled && Array.isArray(relData)) {
              setRelated(relData);
            }
          }
        } catch {
          /* silently ignore */
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

  /* ========== UI STATES ========== */

  if (error) {
    return (
      <p style={{ padding: "1rem", color: "#f88" }}>
        This video can’t be played. Try another one.
      </p>
    );
  }

  if (!video) {
    return <p style={{ padding: "1rem" }}>Loading...</p>;
  }

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
