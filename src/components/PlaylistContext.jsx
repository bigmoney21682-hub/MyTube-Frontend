// File: src/components/PlaylistContext.jsx

import { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("mytube_playlists");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [{ name: "Favorites", videos: [] }];
      }
    }
    return [{ name: "Favorites", videos: [] }];
  });

  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("mytube_playlists", JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name) => {
    if (!name?.trim()) return;
    setPlaylists(prev => [...prev, { name: name.trim(), videos: [] }]);
  };

  const addToPlaylist = (playlistIndex, video) => {
    setPlaylists(prev => {
      const newPlaylists = [...prev];
      const pl = newPlaylists[playlistIndex];
      if (!pl.videos.some(v => v.id === video.id)) {
        pl.videos.push(video);
      }
      return newPlaylists;
    });
  };

  const removeFromPlaylist = (playlistIndex, videoId) => {
    setPlaylists(prev => {
      const newPlaylists = [...prev];
      newPlaylists[playlistIndex].videos = newPlaylists[playlistIndex].videos.filter(v => v.id !== videoId);
      return newPlaylists;
    });
  };

  const currentPlaylist = playlists[currentPlaylistIndex] || { name: "Favorites", videos: [] };

  return (
    <PlaylistContext.Provider value={{
      playlists,
      currentPlaylist,
      currentPlaylistIndex,
      setCurrentPlaylistIndex,
      createPlaylist,
      addToPlaylist,
      removeFromPlaylist
    }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylists = () => useContext(PlaylistContext);
