import React from "react";

function VideoCard({ video, onClick }) {
  return (
    <div className="video-card" onClick={() => onClick(video.id)}>
      <img src={video.thumbnail} alt={video.title} />
      <h4>{video.title}</h4>
      <p>{video.uploader} • {Math.floor(video.view_count / 1000)}K views</p>
    </div>
  );
}

export default React.memo(VideoCard);
