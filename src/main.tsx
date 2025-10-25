// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Use ONE of these, not both:
// 1) If your stylesheet is at project root as "style.css":
import "/style.css";
// 2) If you moved it into src as "src/index.css", then use:
// import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
