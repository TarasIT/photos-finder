import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
