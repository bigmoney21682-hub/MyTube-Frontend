export default function Player({ src }) {
  if (!src) return <p>Loading stream…</p>;

  return (
    <video
      controls
      autoPlay
      style={{ width: "100%", maxWidth: "900px" }}
      src={src}
    />
  );
}
