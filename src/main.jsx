// File: src/main.jsx (or src/index.jsx — your app entry)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PlaylistProvider } from "./components/PlaylistContext";  // Adjust if folder different

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </React.StrictMode>
);
