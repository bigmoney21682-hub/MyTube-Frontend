// src/components/Footer.jsx

import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "8px 12px",
        background: "#000",
        borderTop: "1px solid #222",
      }}
    >
      <button onClick={() => navigate("/")}>← Back</button>
    </footer>
