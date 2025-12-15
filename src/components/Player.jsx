import { useRef, useState, useEffect } from "react";

export default function Player({ src, title, onEnded }) {
  const videoRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null); // Reset message when new src loads
  }, [src]);

  const handleError = () => {
    setErrorMessage("This video can’t be played. Skipping…");

    // Auto-skip after showing message briefly
    setTimeout(() => {
      if (onEnded) onEnded(); // Trigger next video
    }, 1500); // 1.5 seconds to read the message
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
        onError={handleError} // Key: catch playback errors (codec, network, etc.)
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
