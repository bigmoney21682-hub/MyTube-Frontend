import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<div style={{ color: "white" }}>ROUTER OK</div>}
      />
    </Routes>
  );
}
