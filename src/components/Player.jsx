export default function Player({ src }) {
  if (!src) return <p>Loading stream...</p>;

  return (
    <video
      src={src}
      controls
      autoPlay
      style={{ width: "100%", maxHeight: "80vh" }}
    />
  );
}
