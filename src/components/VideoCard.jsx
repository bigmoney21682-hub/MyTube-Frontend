import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

export default function VideoCard({ video }) {
  // Your backend returns: { id, title, thumbnail, uploader, duration }
  const videoId = video.id;
  const title = video.title || 'Untitled';
  const thumbnail = video.thumbnail || '';
  const uploader = video.uploader || 'Unknown';

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
