import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PlaylistProvider } from "./components/PlaylistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </BrowserRouter>
);
