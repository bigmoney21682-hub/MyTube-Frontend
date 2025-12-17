import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";  // <-- Add this import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/playlist" element={<Playlist />} /> {/* if you change to parameterized later */}
      <Route path="/playlist/:id" element={<Playlist />} /> {/* optional better version */}
      <Route path="/playlists" element={<Playlists />} />  {/* <-- Add this line */}
    </Routes>
  );
}
