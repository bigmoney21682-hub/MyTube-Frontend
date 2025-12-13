import { useParams } from "react-router-dom";
import RelatedVideos from "../components/RelatedVideos";

export default function Watch() {
  const { id } = useParams();
  const videoId = id || "dQw4w9WgXcQ"; // fallback
  const apiKey = "YOUR_PUBLIC_API_KEY_HERE"; // temporary; we’ll hide it later

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "white",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      gap: "20px"
    }}>
      <div style={{ maxWidth: "900px", flex: 1 }}>
        <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>Now Playing</h1>
        <div style={{ margin: "30px 0" }}>
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

      {/* Sidebar */}
      <RelatedVideos videoId={videoId} apiKey={apiKey} />
    </div>
  );
}
