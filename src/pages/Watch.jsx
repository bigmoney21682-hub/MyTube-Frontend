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

  function playNext() {
    if (related.length > 0) {
      window.location.href = `/watch/${related[0].id}`;
    }
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError("");
        setVideo(null);
        setStream("");
        setRelated([]);

        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("Video unavailable");

        const data = await res.json();
        if (cancelled) return;

        const best = data.formats
          .filter(f =>
            f.ext === "mp4" &&
            f.vcodec !== "none" &&
            f.acodec !== "none"
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        if (!best?.url) throw new Error("No playable stream");

        setVideo(data);
        setStream(best.url);

        const rel = await fetch(`${API_BASE}/related?id=${id}`);
        if (rel.ok) {
          const relData = await rel.json();
          if (!cancelled) setRelated(relData);
        }

      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message);
      }
    })();

    return () => (cancelled = true);
  }, [id]);

  if (error) {
    return <p style={{ padding: "1rem" }}>This video can’t be played.</p>;
  }

  if (!video) {
    return <p style={{ padding: "1rem" }}>Loading…</p>;
  }

  return (
    <div>
      <div className="player-container">
        <h2>{video.title}</h2>
        <Player src={stream} onEnded={playNext} />
      </div>

      {related.length > 0 && (
        <div className="related-videos">
          <h3>Up Next</h3>
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
