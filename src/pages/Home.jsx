import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import { API_BASE } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search(q) {
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  }

  /* ✅ TRENDING LOAD */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/trending`);
        const data = await res.json();
        setTrending(data);
      } catch {
        setTrending([]);
      }
    })();
  }, []);

  return (
    <div>
      <div className="banner">
        <h1>MyTube</h1>
        <p>Ad-free, premium, ultra-fast streaming</p>
      </div>

      <SearchBar onSearch={search} />

      {loading && <p style={{ padding: "1rem" }}>Loading...</p>}

      {videos.length > 0 ? (
        <div className="grid">
          {videos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <>
          <h3 style={{ padding: "1rem" }}>🔥 Trending</h3>
          <div className="grid">
            {trending.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
