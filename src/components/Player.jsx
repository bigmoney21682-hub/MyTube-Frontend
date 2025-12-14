export default function Player({ videoId }) {
  return (
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
}
