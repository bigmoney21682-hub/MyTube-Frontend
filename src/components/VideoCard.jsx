import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video.id}`}>
      <div className="video-card">
        <img
          src={video.thumbnail.startsWith("http://")
            ? video.thumbnail.replace("http://", "https://")
            : video.thumbnail
          }
        />
        <h3>{video.title}</h3>
        <p>{video.author}</p>
      </div>
    </Link>
  );
}
