import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  if (!video?.id) return null;

  return (
    <Link
      to={`/watch/${video.id}`}
      className="video-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
      />

      <div style={{ padding: "0.5rem" }}>
        <h4 style={{ fontSize: "0.9rem", margin: "0.25rem 0" }}>
          {video.title}
        </h4>

        <p style={{ fontSize: "0.75rem", color: "#aaa" }}>
          {video.uploader} •{" "}
          {video.view_count
            ? `${Math.floor(video.view_count / 1_000)}K views`
            : ""}
        </p>
      </div>
    </Link>
  );
}
