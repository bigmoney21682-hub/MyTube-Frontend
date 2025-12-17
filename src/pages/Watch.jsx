// File: src/pages/Watch.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

// WaitBar component for loading animation
function WaitBar() {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    setFill(0);
    const interval = setInterval(() => {
      setFill(prev => (prev < 10 ? prev + 1 : prev));
    }, 1000); // 1 box per second, total 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh"
    }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            width: "20px",
            height: "20px",
            background: i < fill ? "linear-gradient(45deg, #FFA500, #FF4500)" : "#333",
            borderRadius: "3px",
          }} />
        ))}
      </div>
      <div style={{ color: "#FFA500", fontWeight: 500 }}>Loading...</div>
    </div>
  );
}

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const [related, setRelated] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setVideo(null);
    setStream(null);
    setRelated([]);
    setError(null);
    setLoadingVideo(true);

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("This video is unavailable.");

        const data = await res.json();
        if (cancelled) return;
        setVideo(data);

        const playable = data.formats
          .filter(f =>
            f.url &&
            f.ext === "mp4" &&
            f.vcodec !== "none" &&
            f.acodec !== "none" &&
            !f.is_dash
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        if (!playable.length) throw new Error("No playable stream found.");

        setStream(playable[0].url);

        const rel = await fetch(`${API_BASE}/related?id=${id}`);
        if (rel.ok) {
          const relData = await rel.json();
          if (!cancelled) setRelated(relData.filter(v => v.id));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();

    return () => { cancelled = true; };
  }, [id]);

  const handleVideoError = () => {
    setError("Playback failed (codec, DRM, or network). Skipping...");
    setTimeout(() => {
      if (related.length) navigate(`/watch/${related[0].id}`);
    }, 2000);
  };

  const handleEnded = () => {
    if (related.length) navigate(`/watch/${related[0].id}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Video player */}
      <div style={{ position: "sticky", top: 0, zIndex: 1000, background: "#000" }}>
        {loadingVideo && !stream && <WaitBar />}
        {stream && (
          <Player
            src={stream}
            onEnded={handleEnded}
            onError={handleVideoError}
            onPlay={() => setLoadingVideo(false)}
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <div style={{ padding: "1rem", color: "#f88" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Related videos */}
      {related.length > 0 && (
        <div style={{ padding: "12px", flex: 1 }}>
          <h3>Up Next</h3>
          <div className="grid">
            {related.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}

      {/* Footer pinned to bottom */}
      <footer style={{
        padding: "12px",
        borderTop: "1px solid #222",
        textAlign: "left",
        marginTop: "auto"
      }}>
        <button onClick={() => navigate(-1)}>← Back</button>
      </footer>
    </div>
  );
}
