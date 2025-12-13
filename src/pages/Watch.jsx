import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RelatedVideos from "../components/RelatedVideos";

export default function Watch() {
  const { id } = useParams();
  const videoId = id || "dQw4w9WgXcQ"; // fallback video
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  // Handle orientation change
  useEffect(() => {
    const handleResize = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll related videos into view in portrait
  useEffect(() => {
    if (!isLandscape) {
      const relatedSection = document.getElementById("related-videos");
      if (relatedSection) {
        relatedSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [videoId, isLandscape]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: isLandscape ? "row" : "column",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      {/* Video Player */}
      <div style={{ flex: 2, maxWidth: isLandscape ? "70%" : "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Now Playing</h1>
        <div style={{ width: "100%", aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <a href="#/" style={{ color: "#ff0000", fontSize: "1.2rem", display: "block", marginTop: "15px" }}>
          ← Back to Home
        </a>
      </div>

      {/* Related Videos */}
      <div
        id="related-videos"
        style={{
          flex: 1,
          marginTop: isLandscape ? "0" : "20px",
          marginLeft: isLandscape ? "20px" : "0",
        }}
      >
        <RelatedVideos videoId={videoId} apiKey={process.env.REACT_APP_YT_API_KEY || "<YOUR_API_KEY>"} />
      </div>
    </div>
  );
}
