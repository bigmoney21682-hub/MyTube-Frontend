import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (video.id) navigate(`/watch/${video.id}`);
  };

  return (
    <div className="video-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={video.thumbnail} alt={video.title} />
      <h4>{video.title}</h4>
      <p style={{ fontSize: "0.8rem", color: "#ccc" }}>
        {video.uploader} • {Math.floor(video.view_count / 1000)}K views
      </p>
    </div>
  );
}
