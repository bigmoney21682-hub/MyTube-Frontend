export default function VideoCard({ video }) {
  const videoId = video.id;
  const title = video.title || 'Untitled';
  const thumbnail = video.thumbnail || '';
  const uploader = video.uploader || 'Unknown';

  if (!videoId) return null;

  return (
    <a href={`#/watch/${videoId}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        margin: "15px",
        maxWidth: "360px",
        cursor: "pointer"
      }}>
        <img src={thumbnail} alt={title} style={{ width: "100%", borderRadius: "12px" }} />
        <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>{title}</h3>
        <p style={{ margin: 0, color: "#aaa" }}>{uploader}</p>
      </div>
    </a>
  );
}
