import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "./GameContext/GameContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameProvider>
      <BrowserRouter>
        <App className="game-app" />
      </BrowserRouter>
    </GameProvider>
  </React.StrictMode>
);
