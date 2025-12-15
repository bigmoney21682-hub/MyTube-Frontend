<div className="watch-page">
  <div className="player-container">
    <h2>{video.title}</h2>
    {stream && <Player src={stream} />}
  </div>

  {related.length > 0 && (
    <div className="related-videos">
      <h3>Related Videos</h3>
      <div className="grid">
        {related.map(v => v.id && <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  )}
</div>
