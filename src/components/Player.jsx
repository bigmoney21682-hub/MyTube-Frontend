import { useEffect, useRef } from "react";

export default function Player({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;

    v.muted = true;       // REQUIRED for iOS
    v.playsInline = true;
    v.src = src;

    const playPromise = v.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // iOS will wait for user interaction
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      muted
      preload="metadata"
      style={{ width: "100%" }}
    />
  );
}
