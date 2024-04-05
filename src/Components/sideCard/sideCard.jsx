import { useEffect, useState } from "react";
import { FaWindows, FaRegStar, FaStar } from "react-icons/fa";

import { useGameContext } from "../../GameContext/GameContext";
import { MdOutlineWebAsset } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./sideCard.css";
function SideCard(props) {
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
      },
    });
  };
  const handleStarClick = () => {
    if (isSaved) {
      removeGame(props.container.id);
    } else {
      addGame(props.container);
    }
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const isGameSaved = savedGames.some(
      (game) => game.id === props.container.id
    );
    setIsSaved(isGameSaved);
  }, [props.container.id, savedGames]);

  return (
    <div className="sideCard-main">
      <div className="sideCard-content">
        <div className="sideCard-img-text" onClick={handleCardClick}>
          <img alt="Image Not found" src={props.container.thumbnail} />
          <div className="sideCard-info">
            <h4>{props.container.title}</h4>
            <p>{props.container.genre}</p>
          </div>
        </div>

        <div className="platform-star">
          <div className="sideCard-platform" onClick={handleCardClick}>
            {props.container.platform === "PC (Windows)" ? (
              <FaWindows className="platform windows" />
            ) : (
              <MdOutlineWebAsset className="platform " />
            )}
          </div>
          <div className="sideCard-star">
            {isSaved ? (
              <FaStar onClick={handleStarClick} title="Remove from favorites" />
            ) : (
              <FaRegStar onClick={handleStarClick} title="Add To favorites" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideCard;
