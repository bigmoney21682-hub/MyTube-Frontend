// Filename: src/pages/Watch.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Watch() {
  const { id } = useParams();
  const videoId = id || "dQw4w9WgXcQ"; // fallback
  const [related, setRelated] = useState([]);

  const API_KEY = "AIzaSyCWx93j-IQ9LiyUrh1rjtiLQEDIe1S-aXs"; // keep in quotes

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=5&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items) setRelated(data.items);
        else console.error("No items returned", data);
      } catch (err) {
        console.error("Error fetching related videos:", err);
      }
    }
    fetchRelated();
  }, [videoId]);

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <h1>Now Playing</h1>
      <iframe
        width="100%"
        height="506"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h2>Related Videos</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {related.length
          ? related.map((v) => (
              <a
                key={v.id.videoId}
                href={`/watch/${v.id.videoId}`}
                style={{ color: "#fff", margin: "5px 0" }}
              >
                {v.snippet.title}
              </a>
            ))
          : "Loading related videos..."}
      </div>
    </div>
  );
}
