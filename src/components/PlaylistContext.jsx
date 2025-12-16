import { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("mytube_playlists");
    return saved ? JSON.parse(saved) : [{ name: "Favorites", videos: [] }];
  });

  const [currentPlaylist, setCurrentPlaylist] = useState(0); // index

  useEffect(() => {
    localStorage.setItem("mytube_playlists", JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name) => {
    setPlaylists([...playlists, { name, videos: [] }]);
  };

  const addToPlaylist = (playlistIndex, video) => {
    const newPlaylists = [...playlists];
    newPlaylists[playlistIndex].videos.push(video);
    setPlaylists(newPlaylists);
  };

  const switchPlaylist = (index) => setCurrentPlaylist(index);

  return (
    <PlaylistContext.Provider value={{
      playlists,
      currentPlaylist,
      currentVideos: playlists[currentPlaylist]?.videos || [],
      createPlaylist,
      addToPlaylist,
      switchPlaylist
    }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylists = () => useContext(PlaylistContext);
