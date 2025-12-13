import { useParams } from "react-router-dom";

export default function Watch() {
  const { id } = useParams();
  const videoId = id || "dQw4w9WgXcQ"; // Rick Roll as fallback 😄

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "white",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2.5rem" }}>Now Playing</h1>
      <div style={{ maxWidth: "900px", margin: "30px auto" }}>
        <iframe
          width="100%"
          height="506"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <a href="#/" style={{ color: "#ff0000", fontSize: "1.5rem" }}>← Back to Home</a>
    </div>
  );
}
