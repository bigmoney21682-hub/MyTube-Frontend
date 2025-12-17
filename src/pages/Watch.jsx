// src/pages/Watch.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import WaitBar from "../components/WaitBar";
import Footer from "../components/Footer";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fatalError, setFatalError] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setVideo(null);
      setStream(null);
      setRelated([]);
      setFatalError(null);
      setHasPlayed(false);
      setLoading(true);

      try {
        // 1️⃣ Load video metadata
        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("Video unavailable");

        const data = await res.json();
        if (!data?.formats) throw new Error("Invalid video data");
        if (cancelled) return;

        setVideo(data);

        // 2️⃣ Pick best Safari-compatible stream
        const playable = data.formats
          .filter(f =>
            f.url &&
            f.ext === "mp4" &&
            f.vcodec !== "none" &&
            f.acodec !== "none" &&
            !f.is_dash
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        if (!playable.length) {
          throw new Error("No compatible stream");
        }

        setStream(playable[0].url);

        // 3️⃣ Load related (non-blocking)
        fetch(`${API_BASE}/related?id=${id}`)
          .then(r => (r.ok ? r.json() : []))
          .then(d => {
            if (!cancelled && Array.isArray(d)) {
              setRelated(d.filter(v => v?.id));
            }
          });

      } catch (err) {
        if (!cancelled) {
          setFatalError(err.message || "Playback failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // ▶️ Auto-advance logic
  function handleEnded() {
    if (related.length > 0) {
      navigate(`/watch/${related[0].id}`);
    }
  }

  function handlePlaybackError() {
    if (hasPlayed) return;

    setFatalError("This video can’t be played. Skipping…");

    setTimeout(() => {
      if (related.length > 0) {
        navigate(`/watch/${related[0].id}`);
      }
    }, 2000);
  }

  return (
    <div>
      {/* 🔒 Header ALWAYS visible */}
      <Header />

      {/* 🎬 Player zone */}
      {loading && (
        <div style={{ marginTop: 80 }}>
          <WaitBar label="Loading video" />
        </div>
      )}

      {!loading && fatalError && (
        <div style={{ padding: 16, color: "#f88", textAlign: "center" }}>
          <p>⚠️ {fatalError}</p>
          <p style={{ opacity: 0.7 }}>Skipping to next video…</p>
        </div>
      )}

      {!loading && video && stream && (
        <>
          {/* 📌 Sticky player */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 5,
              background: "#000",
            }}
          >
            <Player
              src={stream}
              onEnded={handleEnded}
              onError={handlePlaybackError}
              onPlay={() => setHasPlayed(true)}
            />
          </div>

          {/* 🎥 Title */}
          <div style={{ padding: "12px" }}>
            <h2 style={{ marginBottom: 8 }}>{video.title}</h2>
          </div>

          {/* 🔜 Related */}
          {related.length > 0 && (
            <>
              <h3 style={{ padding: "0 12px" }}>Up Next</h3>
              <div className="grid">
                {related.map(v => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
