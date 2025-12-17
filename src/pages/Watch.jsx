import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Spinner";
import { API_BASE } from "../config";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [stream, setStream] = useState("");
  const [related, setRelated] = useState([]);
  const [fatalError, setFatalError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setVideo(null);
        setStream("");
        setRelated([]);
        setFatalError("");

        const res = await fetch(`${API_BASE}/video?id=${id}`);
        if (!res.ok) throw new Error("Video removed or unavailable");

        const data = await res.json();
        if (!data?.formats) throw new Error("Invalid metadata");

        if (cancelled) return;
        setVideo(data);

        const playable = data.formats
          .filter(f =>
            f.url &&
            f.ext === "mp4" &&
            f.vcodec !== "none" &&
            f.acodec !== "none"
          )
          .sort((a, b) => (b.height || 0) - (a.height || 0));

        if (!playable.length) {
          throw new Error("No Safari-compatible stream");
        }

        setStream(playable[0].url);

        const rel = await fetch(`${API_BASE}/related?id=${id}`);
        if (rel.ok) {
          const relData = await rel.json();
          if (!cancelled) setRelated(relData || []);
        }

      } catch (err) {
        if (!cancelled) setFatalError(err.message);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  function handleVideoError() {
    setFatalError("Playback failed (codec, DRM, or network)");
    setTimeout(() => {
      if (related.length > 0) {
        navigate(`/watch/${related[0].id}`);
      }
    }, 2500);
  }

  if (fatalError) {
    return (
      <div style={{ padding: "1rem", color: "#f88" }}>
        <p>⚠️ {fatalError}</p>
        <p style={{ opacity: 0.7 }}>Skipping to next video…</p>
      </div>
    );
  }

  if (!video || !stream) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>{video.title}</h2>

      <Player
        src={stream}
        onEnded={() => related[0] && navigate(`/watch/${related[0].id}`)}
        onError={handleVideoError}
      />

      {related.length > 0 && (
        <>
          <h3>Up Next</h3>
          <div className="grid">
            {related.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
