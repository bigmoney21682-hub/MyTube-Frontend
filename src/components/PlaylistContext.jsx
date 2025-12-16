// File: src/components/PlaylistContext.jsx  (create this in your frontend components folder)

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
    if (!name.trim()) return;
    setPlaylists([...playlists, { name, videos: [] }]);
  };

  const addToPlaylist = (playlistIndex, video) => {
    const newPlaylists = [...playlists];
    // Avoid duplicates in the same playlist
    const exists = newPlaylists[playlistIndex].videos.some(v => v.id === video.id);
    if (!exists) {
      newPlaylists[playlistIndex].videos.push(video);
      setPlaylists(newPlaylists);
    }
  };

  const removeFromPlaylist = (playlistIndex, videoId) => {
    const newPlaylists = [...playlists];
    newPlaylists[playlistIndex].videos = newPlaylists[playlistIndex].videos.filter(v => v.id !== videoId);
    setPlaylists(newPlaylists);
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
