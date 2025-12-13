import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RelatedVideos({ videoId, apiKey }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoId) return;

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${apiKey}&maxResults=5`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch related videos");
        return res.json();
      })
      .then(data => {
        if (!data.items || data.items.length === 0) {
          setError("No related videos found.");
          setVideos([]);
        } else {
          setVideos(data.items);
          setError("");
        }
      })
      .catch(() => {
        setError("Error loading related videos. Please try again.");
        setVideos([]);
      });
  }, [videoId, apiKey]);

  const isLandscape = window.innerWidth > window.innerHeight;

  if (error) {
    return (
      <div style={{ color: "#fff", fontSize: "0.9rem", padding: "5px" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: isLandscape ? "column" : "row",
      gap: "10px",
      overflowX: isLandscape ? "hidden" : "auto",
      overflowY: isLandscape ? "auto" : "hidden",
      maxHeight: isLandscape ? "80vh" : "160px",
    }}>
      {videos.map(v => (
        <div
          key={v.id.videoId}
          onClick={() => navigate(`/watch/${v.id.videoId}`)}
          style={{ cursor: "pointer", flex: "0 0 auto", minWidth: isLandscape ? "100%" : "140px" }}
        >
          <img src={v.snippet.thumbnails.medium.url} alt={v.snippet.title} width="100%" />
          <p style={{ color: "#fff", fontSize: "0.8rem" }}>{v.snippet.title}</p>
        </div>
      ))}
    </div>
  );
}
