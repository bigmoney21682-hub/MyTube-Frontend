import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        {/* Fallback if something goes wrong */}
        <Route path="*" element={
          <div style={{ padding: "50px", textAlign: "center", background: "#000", color: "#0f0", minHeight: "100vh" }}>
            <h1>APP IS LOADED (Fallback)</h1>
            <p>If you see this green text on black → React is working!</p>
            <p>Check if Home.jsx exists and has no errors.</p>
          </div>
        } />
      </Routes>
    </HashRouter>
  );
}
