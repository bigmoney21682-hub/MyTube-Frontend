// File: src/pages/Watch.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Watch() {
  const { id } = useParams();
  const videoId = id || "dQw4w9WgXcQ"; // fallback
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyCWx93j-IQ9LiyUrh1rjtiLQEDIe1S-aXs"; // <-- put your API key between quotes

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=5&key=${API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch related videos");

        const data = await res.json();
        if (data.items) setRelatedVideos(data.items);
        else setError("No related videos found");
      } catch (err) {
        console.error(err);
        setError("Error loading related videos");
      }
    }

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
      {/* Video player */}
      <div style={{ flex: 2, padding: "20px" }}>
        <h1 style={{ fontSize: "2rem", textAlign: "center" }}>Now Playing</h1>
        <iframe
          width="100%"
          height={isPortrait ? 300 : 506}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Link to="/" style={{ color: "#ff0000", fontSize: "1.2rem" }}>
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Related videos sidebar */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          background: "#111",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          maxHeight: isPortrait ? "200px" : "auto",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          Related Videos
        </h2>
        {error && <p>{error}</p>}
        {!error && relatedVideos.length === 0 && <p>Loading...</p>}
        {!error &&
          relatedVideos.map((video) => (
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
                style={{ marginRight: "10px" }}
              />
              <span style={{ flex: 1 }}>{video.snippet.title}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
