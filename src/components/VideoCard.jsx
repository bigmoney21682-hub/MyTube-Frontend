import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      className="video-card"
      onClick={() => navigate(`/watch/${video.id}`)}
      role="button"
      tabIndex={0}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
        }}
      />

      <h4>{video.title}</h4>

      <p>
        {video.uploader} • {Math.floor(video.view_count / 1000)}K views
      </p>
    </div>
  );
}
