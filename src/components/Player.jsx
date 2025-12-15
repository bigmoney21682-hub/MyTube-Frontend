export default function Player({ src, onEnded }) {
  if (!src) return null;

  return (
    <video
      src={src}
      controls
      autoPlay
      playsInline
      preload="metadata"
      onEnded={onEnded}
      style={{ width: "100%", background: "#000" }}
    />
  );
}
