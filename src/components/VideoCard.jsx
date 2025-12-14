import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  const videoId = video.id || video.id?.videoId; // Support both formats temporarily
  const title = video.title || video.snippet?.title || 'Untitled';
  const thumbnail = video.thumbnail || video.snippet?.thumbnails?.medium?.url || '';
  const uploader = video.uploader || video.snippet?.channelTitle || 'Unknown';

  if (!videoId) return null; // Safety

  return (
    <Link to={`/watch/${videoId}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        margin: "15px",
        maxWidth: "360px",
        cursor: "pointer"
      }}>
        <img
          src={thumbnail}
          alt={title}
          style={{ width: "100%", borderRadius: "12px" }}
        />
        <h3 style={{
          fontSize: "1.1rem",
          margin: "10px 0 5px 0",
          lineHeight: "1.3",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {title}
        </h3>
        <p style={{ margin: 0, color: "#aaa", fontSize: "0.9rem" }}>
          {uploader}
        </p>
      </div>
    </Link>
  );
}
