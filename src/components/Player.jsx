export default function Player({ src, onEnded }) {
  if (!src) return null;

  return (
    <video
      src={src}
      controls
      autoPlay
      playsInline
      onEnded={onEnded}
      style={{
        width: "100%",
        borderRadius: "10px",
        background: "#000"
      }}
    />
  );
}
