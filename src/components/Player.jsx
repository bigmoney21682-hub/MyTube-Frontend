export default function Player({ streamUrl }) {
  return (
    <video
      src={streamUrl}
      controls
      autoPlay
      style={{ width: "100%", maxHeight: "70vh" }}
    />
  );
}
