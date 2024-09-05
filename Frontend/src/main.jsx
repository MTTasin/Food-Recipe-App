import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RecipeState from "./Context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <RecipeState>
        <App />
      </RecipeState>
    </StrictMode>
  </BrowserRouter>
);
