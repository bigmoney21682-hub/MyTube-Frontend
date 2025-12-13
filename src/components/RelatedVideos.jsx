import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RelatedVideos({ videoId, apiKey }) {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!videoId) return;

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${apiKey}&maxResults=5`)
      .then(res => res.json())
      .then(data => setVideos(data.items || []))
      .catch(err => console.error("Failed to fetch related videos:", err));
  }, [videoId, apiKey]);

  return (
    <div style={{ width: "300px", marginLeft: "20px", overflowY: "auto", maxHeight: "80vh" }}>
      {videos.map(video => (
        <div
          key={video.id.videoId}
          onClick={() => navigate(`/watch/${video.id.videoId}`)}
          style={{ cursor: "pointer", marginBottom: "15px", textAlign: "left" }}
        >
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} width="100%" />
          <p style={{ fontSize: "0.9rem", color: "#fff", marginTop: "5px" }}>{video.snippet.title}</p>
        </div>
      ))}
    </div>
  );
}
