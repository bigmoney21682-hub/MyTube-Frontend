import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);
  const [errorReason, setErrorReason] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // RESET STATE (CRITICAL)
        setVideo(null);
        setStream("");
        setRelated([]);
        setError(null);
        setErrorReason("");

        /* ========== VIDEO METADATA ========== */
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) {
          throw new Error("Video is unavailable or removed");
        }

        const data = await res.json();
        if (!data?.formats || !Array.isArray(data.formats)) {
          throw new Error("Invalid video data returned");
        }

        if (cancelled) return;
        setVideo(data);

        /* ========== FORMAT SELECTION ========== */
        const playable = data.formats
          .filter(f =>
            f.url &&
            f.ext === "mp4" &&
            f.vcodec !== "none" &&
            f.acodec !== "none" &&
            !f.is_dash &&
            (f.height || 0) <= 720
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        if (!playable.length) {
          throw new Error(
            "No playable MP4 streams (video may be DRM-locked, region-blocked, or DASH-only)"
          );
        }

        setStream(playable[0].url);

        /* ========== RELATED ========== */
        const rel = await fetch(`${API_BASE}/related?id=${id}`);
        if (rel.ok) {
          const relData = await rel.json();
          if (!cancelled && Array.isArray(relData)) {
            setRelated(relData);
          }
        }

      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(true);
          setErrorReason(err.message || "Unknown playback failure");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ========== AUTO-SKIP ON ERROR ========== */
  useEffect(() => {
    if (error && related.length > 0) {
      const t = setTimeout(() => {
        navigate(`/watch/${related[0].id}`);
      }, 2500);

      return () => clearTimeout(t);
    }
  }, [error, related, navigate]);

  /* ========== AUTOPLAY NEXT ========== */
  function handleEnded() {
    if (related.length > 0) {
      navigate(`/watch/${related[0].id}`);
    }
  }

  /* ========== RENDER STATES ========== */

  // Fatal playback failure (no stream)
  if (error && !stream) {
    return (
      <div style={{ padding: "1rem", color: "#f88" }}>
        <p>⚠️ This video can’t be played.</p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          Reason: {errorReason}
        </p>
        <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>
          Skipping to next available video…
        </p>
      </div>
    );
  }

  // Loading
  if (!video || !stream) {
    return <p style={{ padding: "1rem" }}>Loading video…</p>;
  }

  // Playable
  return (
    <div>
      <div className="player-container">
        <h2>{video.title}</h2>
        <Player src={stream} onEnded={handleEnded} />
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
