import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css"
import { createBrowserRouter } from "react-router-dom";

createBrowserRouter([
  { path: "/", element: <App></App>, children: [{ index: true }] },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
