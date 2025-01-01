import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";

const ROOT = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(ROOT).render(
  <StrictMode>
    <h1 className="font-bold text-purple-700 text-center mb-6">Type 750</h1>
  </StrictMode>
);
