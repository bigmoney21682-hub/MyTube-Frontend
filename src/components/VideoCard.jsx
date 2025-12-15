import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  if (!video?.id) return null; // safeguard

  return (
    <Link to={`/watch/${video.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="video-card">
        <img src={video.thumbnail} alt={video.title} />
        <h4>{video.title}</h4>
        <p style={{ fontSize: "0.8rem", color: "#ccc" }}>
          {video.uploader} • {Math.floor(video.view_count / 1000)}K views
        </p>
      </div>
    </Link>
  );
}
