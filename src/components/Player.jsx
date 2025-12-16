import { useRef, useState, useEffect } from "react";

export default function Player({ src, title, onEnded, isSafariPlayable }) {
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setErrorMessage(null);
    clearTimeout(timeoutRef.current);

    if (!src) return;

    // Preemptive skip for known unplayable videos
    if (isSafariPlayable === false) {
      setErrorMessage("This video can’t be played. Skipping…");
      timeoutRef.current = setTimeout(() => {
        setErrorMessage(null);
        if (onEnded) onEnded();
      }, 1500);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {});

    // Longer timeout + better check to avoid false positives
    timeoutRef.current = setTimeout(() => {
      if (video.currentTime < 1 && !video.ended && video.readyState < 3) {
        handlePlaybackIssue({ type: 'timeout' });
      }
    }, 8000);

    return () => clearTimeout(timeoutRef.current);
  }, [src, isSafariPlayable, onEnded]);

  const handlePlaybackIssue = (e) => {
    console.log(`Playback issue detected: ${e.type}`);

    if (errorMessage) return; // No duplicates

    setErrorMessage("This video can’t be played. Skipping…");

    timeoutRef.current = setTimeout(() => {
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
        preload="auto"
        onEnded={onEnded}
        onError={handlePlaybackIssue}
        onStalled={handlePlaybackIssue}
        onAbort={handlePlaybackIssue}
        onSuspend={handlePlaybackIssue}
        onEmptied={handlePlaybackIssue}
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
