// File: src/pages/Watch.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);

  // -----------------------------
  // Fetch video + related
  // -----------------------------
  useEffect(() => {
    let cancelled = false;

    setVideo(null);
    setStream(null);
    setRelated([]);
    setError(null);

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("Video unavailable");

        const data = await res.json();
        if (cancelled) return;

        setVideo(data);

        const playable = data.formats
          .filter(
            f =>
              f.url &&
              f.ext === "mp4" &&
              f.vcodec !== "none" &&
              f.acodec !== "none" &&
              !f.is_dash
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        if (!playable.length) throw new Error("No playable stream");

        setStream(playable[0].url);

        const rel = await fetch(`${API_BASE}/related?id=${id}`);
        if (rel.ok) {
          const relData = await rel.json();
          setRelated(relData.filter(v => v.id));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // -----------------------------
  // Skip time controls
  // -----------------------------
  const skipBack10 = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  const skipForward10 = () => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };

  // -----------------------------
  // Video navigation (RELATED)
  // -----------------------------
  const playNextRelated = () => {
    if (related.length > 0) {
      navigate(`/watch/${related[0].id}`);
    }
  };

  // Previous related not tracked yet (intentional)
  const playPreviousRelated = () => {
    // Placeholder – intentionally no-op for now
  };

  return (
    <div style={{ paddingBottom: "60px" }}>
      {/* Player */}
      {stream && (
        <div style={{ position: "sticky", top: 0, background: "#000", zIndex: 10 }}>
          <div style={{ position: "relative" }}>
            <Player
              ref={videoRef}
              src={stream}
              onEnded={playNextRelated}
            />

            {/* Controls overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button onClick={playPreviousRelated} disabled>
                ⏮
              </button>

              <button onClick={skipBack10}>
                ⏪ 10s
              </button>

              <button onClick={skipForward10}>
                10s ⏩
              </button>

              <button onClick={playNextRelated} disabled={!related.length}>
                ⏭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ padding: 16, color: "#f66" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Related */}
      <div style={{ padding: 12 }}>
        {related.length > 0 && <h3>Up Next</h3>}
        {related.map(v => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
