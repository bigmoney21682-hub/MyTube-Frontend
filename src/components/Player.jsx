import { useRef, useEffect, useState } from "react";

export default function Player({ src }) {
  const videoRef = useRef(null);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }, [rate, src]);

  if (!src) return null;

  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        preload="metadata"
      />

      {/* Speed control */}
      <div style={{ marginTop: "0.5rem" }}>
        <label style={{ fontSize: "0.8rem", marginRight: "0.5rem" }}>
          Speed:
        </label>
        {[1, 1.25, 1.5].map(r => (
          <button
            key={r}
            onClick={() => setRate(r)}
            style={{
              marginRight: "0.4rem",
              padding: "0.25rem 0.5rem",
              fontSize: "0.75rem",
              background: rate === r ? "#ff9800" : "#222",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {r}×
          </button>
        ))}
      </div>
    </div>
  );
}
