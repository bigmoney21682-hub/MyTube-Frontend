import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { PlaylistProvider } from "./components/PlaylistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlaylistProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </PlaylistProvider>
  </React.StrictMode>
);
