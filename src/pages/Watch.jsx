import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Watch() {
  const { id } = useParams();
  const videoId = id || "dQw4w9WgXcQ"; // fallback video
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "<YOUR_API_KEY_HERE>"; // import from secure location if possible

  // Fetch related videos
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=5&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.error) {
          setError(data.error.message);
          return;
        }

        setRelated(data.items);
      } catch (err) {
        setError("Failed to load related videos");
      }
    };

    fetchRelated();
  }, [videoId]);

  // Detect orientation
  const isPortrait = window.innerHeight > window.innerWidth;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isPortrait ? "column" : "row",
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
      }}
    >
      {/* Main video */}
      <div style={{ flex: 2, padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>Now Playing</h1>
        <div style={{ maxWidth: "900px", margin: "20px auto" }}>
          <iframe
            width="100%"
            height={isPortrait ? "250px" : "506px"}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Link to="/" style={{ color: "#ff0000", fontSize: "1.2rem" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Related videos */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          borderLeft: isPortrait ? "none" : "1px solid #444",
          borderTop: isPortrait ? "1px solid #444" : "none",
          padding: "10px",
          background: "#111",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Related Videos</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {related.map((video) => (
          <Link
            key={video.id.videoId}
            to={`/watch/${video.id.videoId}`}
            style={{
              display: "flex",
              marginBottom: "10px",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              style={{ marginRight: "10px", width: "120px", height: "90px" }}
            />
            <div style={{ fontSize: "0.9rem" }}>
              {video.snippet.title.length > 50
                ? video.snippet.title.slice(0, 50) + "..."
                : video.snippet.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
