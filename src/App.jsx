import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
// Playlist page can be a stub for now
import Playlist from "./pages/Playlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/playlist" element={<Playlist />} />
    </Routes>
  );
}
