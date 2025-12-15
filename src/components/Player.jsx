// Filename: src/components/Player.jsx
import { useRef, useEffect } from "react";

export default function Player({ src, autoPlay = true, defaultSpeed = 1.0 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = defaultSpeed;
  }, [defaultSpeed, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay={autoPlay}
      preload="auto"   // Speed boost: preloads video data
      style={{ width: "100%", maxHeight: "480px", borderRadius: "8px" }}
    />
  );
}
