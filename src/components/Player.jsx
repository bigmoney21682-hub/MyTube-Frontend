export default function Player({ src }) {
  return (
    <video
      src={src}
      controls
      autoPlay
      style={{
        width: "100%",
        borderRadius: "8px",
        backgroundColor: "#000"
      }}
    />
  );
}
