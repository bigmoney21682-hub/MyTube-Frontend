// src/pages/Home.jsx
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import Player from "../components/Player";
import { API_BASE } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch trending videos
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/trending?page=${page}`);
        const data = await res.json();
        setTrending(prev => [...prev, ...data]);
      } catch (err) {
        console.error("Trending fetch failed", err);
      }
    })();
  }, [page]);

  // Infinite scroll for trending
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        if (!loadingMore) {
          setLoadingMore(true);
          setPage(prev => prev + 1);
          setLoadingMore(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore]);

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

  return (
    <div>
      <div className="banner">
        <h1>MyTube GOD MODE</h1>
        <p>Ad-free, premium, ultra-fast streaming</p>
      </div>

      <SearchBar onSearch={search} />

      <div className="home-layout">
        <div className="player-container">
          {selectedVideo ? (
            <>
              <h2>{selectedVideo.title}</h2>
              <Player src={selectedVideo.stream} />
            </>
          ) : (
            <p style={{ padding: "1rem" }}>Select a trending video to play</p>
          )}
        </div>

        <div className="trending-videos">
          <h3>Trending Videos</h3>
          <div className="grid">
            {trending.map(v => (
              <div
                key={v.id}
                onClick={() =>
                  setSelectedVideo({ ...v, stream: v.formats[0]?.url })
                }
                style={{ cursor: "pointer" }}
              >
                <VideoCard video={v} />
              </div>
            ))}
          </div>
          {loadingMore && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
}
