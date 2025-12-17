// src/pages/Watch.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import ProgressLoader from "../components/ProgressLoader";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const [related, setRelated] = useState([]);
  const [fatalError, setFatalError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setVideo(null);
        setStream(null);
        setRelated([]);
        setFatalError("");

        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("Video unavailable");

        const data = await res.json();
        if (!data?.formats) throw new Error("Invalid metadata");

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

        if (!playable.length) throw new Error("No compatible stream");

        setStream(playable[0].url);

        const rel = await fetch(`${API_BASE}/related?id=${id}`);
        if (rel.ok && !cancelled) {
          setRelated(await rel.json());
        }

      } catch (err) {
        if (!cancelled) setFatalError(err.message);
      }
    }

    load();
    return () => (cancelled = true);
  }, [id]);

  if (fatalError) {
    return (
      <>
        <Header />
        <div style={{ padding: 24, color: "#f88" }}>
          <p>⚠️ {fatalError}</p>
        </div>
      </>
    );
  }

  if (!video || !stream) {
    return (
      <>
        <Header />
        <div
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ProgressLoader />
          <p style={{ opacity: 0.8 }}>Loading video…</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div style={{ padding: "0 12px" }}>
        <h2>{video.title}</h2>

        <Player
          src={stream}
          onEnded={() =>
            related[0] && navigate(`/watch/${related[0].id}`)
          }
          onError={() =>
            related[0] && navigate(`/watch/${related[0].id}`)
          }
        />
      </div>

      {related.length > 0 && (
        <div style={{ padding: "12px" }}>
          <h3>Up Next</h3>
          <div className="grid">
            {related.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
