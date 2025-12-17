// src/components/Spinner.jsx

import ProgressLoader from "./ProgressLoader";

export default function Spinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        gap: 24,
      }}
    >
      <ProgressLoader duration={800} />
      <p style={{ color: "#fff", opacity: 0.9, fontSize: "1.2rem" }}>
        Searching…
      </p>
    </div>
  );
}
