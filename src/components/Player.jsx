import { useRef, useState, useEffect } from "react";

export default function Player({ src, title, onEnded }) {
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setErrorMessage(null); // Reset
    clearTimeout(timeoutRef.current);

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }

    // Auto-skip if no progress after 5s (catches silent stalls)
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.currentTime === 0 && !videoRef.current.ended) {
        handlePlaybackIssue({ type: 'timeout' });
      }
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [src]);

  const handlePlaybackIssue = (e) => {
    console.log(`Playback issue: ${e.type}`); // Debug log

    setErrorMessage("This video can’t be played. Skipping…");

    // Show message briefly, then skip
    setTimeout(() => {
      setErrorMessage(null);
      if (onEnded) onEnded();
    }, 1500);
  };

  if (!src) return null;

  return (
    <div style={{ position: "relative", width: "100%", background: "#000" }}>
      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        preload="metadata"
        onEnded={onEnded}
        onError={handlePlaybackIssue}
        onStalled={handlePlaybackIssue}
        onAbort={handlePlaybackIssue}
        onSuspend={handlePlaybackIssue}
        style={{ width: "100%", display: "block" }}
      />

      {errorMessage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "500",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10,
            animation: "fadeIn 0.3s ease",
          }}
        >
          {errorMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
