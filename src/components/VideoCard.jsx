import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      className="video-card"
      onClick={() => navigate(`/watch/${video.id}`)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        onError={e => {
          e.target.onerror = null;
          e.target.src = "/fallback.jpg";
        }}
      />

      <div style={{ padding: "0.5rem" }}>
        <h4>{video.title}</h4>
        <p>{video.uploader}</p>
      </div>
    </div>
  );
}
