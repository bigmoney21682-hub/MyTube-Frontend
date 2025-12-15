import { useState, useEffect } from "react";
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
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch trending videos on page load
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/trending`);
        const data = await res.json();
        setTrending(data);
      } catch (err) {
        console.error("Failed to fetch trending", err);
      }
    })();
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <h1>MyTube GOD MODE</h1>
        <p>Ad-free, premium, ultra-fast streaming</p>
      </div>

      <SearchBar onSearch={search} />

      {loading && <p>Loading...</p>}

      <div className="player-trending-layout">
        {videos.length > 0 && (
          <div className="player-panel">
            <VideoCard video={videos[0]} clickable /> {/* first search result mini player */}
          </div>
        )}

        <div className="trending-panel">
          <h3>Trending Videos</h3>
          <div className="grid scrollable">
            {trending.map(v => (
              <VideoCard key={v.id} video={v} clickable />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
