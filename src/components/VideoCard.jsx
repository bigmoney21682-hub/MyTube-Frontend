export default function VideoCard({ video }) {
  const { id, snippet } = video;
  const videoId = id.videoId;

  return (
    <a href={`#/watch/${videoId}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        margin: "15px",
        maxWidth: "360px",
        cursor: "pointer"
      }}>
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          style={{ width: "100%", borderRadius: "12px" }}
        />
        <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>
          {snippet.title}
        </h3>
      </div>
    </a>
  );
}
