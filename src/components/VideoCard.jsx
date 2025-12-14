import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video.id}`} className="video-card">
      <img src={video.thumbnail} alt={video.title} />
      <h4>{video.title}</h4>
      <p>{video.uploader}</p>
    </Link>
  );
}
