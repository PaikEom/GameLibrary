import React from "react";
import { useGameContext } from "../../GameContext/GameContext";
import Card from "../../Components/Card/Card";
import "./SavedGames.css";
import { IoIosClose } from "react-icons/io";
function SavedGames({
  sidePanelWidth,
  toggleSidePanel,
  setMenuOpen,
  menuOpen,
}) {
  const { savedGames } = useGameContext();

  return (
    <div className="savedGames-div" style={{ right: `${sidePanelWidth}%` }}>
      <div className="savedGames-content">
        <div className="closeGame-div">
          <h3>Saved Games </h3>
          <IoIosClose className="close-icon" onClick={toggleSidePanel} />
        </div>
        <div className="savedGames">
          {savedGames.length === 0 ? (
            <p className="savedGames-noG">No saved games yet.</p>
          ) : (
            <div className="saved-games-container">
              {savedGames.map((game) => (
                <div
                  key={game.id}
                  className="card-saved-div"
                  onClick={() => {
                    toggleSidePanel(), setMenuOpen(false);
                  }}
                >
                  <Card key={game.id} container={game} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedGames;
