import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaWindows } from "react-icons/fa";
import { useGameContext } from "../../GameContext/GameContext";
import { MdOutlineWebAsset } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Card.css";
function Card(props) {
  const { savedGames, addGame, removeGame } = useGameContext();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const genreMappings = {
    Shooter: "shooter",
    "Battle Royale": "battle-royale",
    MMOARPG: "mmorpg",
    MMORPG: "mmorpg",
    Strategy: "strategy",
    MOBA: "moba",
    Racing: "racing",
    Sports: "sports",
    ARPG: "action-rpg",
    Fighting: "fighting",
    "Action RPG": "action-rpg",
    Card: "card",
    "Card Game": "card",
    MMO: "mmo.mmotps",
  };
  const platformMappings = {
    "PC (Windows)": "pc",
    "Web Browser": "browser",
  };

  const handleCardClick = () => {
    const mappedGenre = genreMappings[props.container.genre];

    const mappedPlatform = platformMappings[props.container.platform];
    navigate("/gameInfor", {
      state: {
        id: props.container.id,
        genre: mappedGenre,
        platform: mappedPlatform,
        isSaved: isSaved,
      },
    });
  };
  const handleStarClick = () => {
    if (isSaved) {
      // Remove the game from context
      removeGame(props.container.id);
    } else {
      // Save the game in context
      addGame(props.container);
    }
    // Toggle the isSaved state
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const isGameSaved = savedGames.some(
      (game) => game.id === props.container.id
    );
    setIsSaved(isGameSaved);
  }, [props.container.id, savedGames]);

  return (
    <div className="game-card">
      <div className="game-image-div">
        <img
          className="game-image"
          alt="Image Not found"
          src={props.container.thumbnail}
          onClick={handleCardClick}
        />
        <div className="star-div">
          {isSaved ? (
            <FaStar
              onClick={handleStarClick}
              title="Remove from favorites"
              className="star-div-full"
            />
          ) : (
            <FaRegStar
              onClick={handleStarClick}
              title="Add To favorites"
              className="star-div-empty"
            />
          )}
        </div>
      </div>
      <div className="game-information" onClick={handleCardClick}>
        <div className="game-info-tp">
          <p>{props.container.genre}</p>
        </div>

        {props.container.platform === "PC (Windows)" ? (
          <FaWindows className="platform windows" />
        ) : (
          <MdOutlineWebAsset className="platform" />
        )}
      </div>
    </div>
  );
}

export default Card;
