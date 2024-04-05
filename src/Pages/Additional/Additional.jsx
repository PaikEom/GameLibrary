import { useState, useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useGameContext } from "../../GameContext/GameContext";
import { useLocation } from "react-router-dom";
import { getGameById } from "../../api";
import { fetchData } from "../../api";
import Card from "../../Components/Card/Card";
import "./Additional.css";
function Additional() {
  const { savedGames, addGame, removeGame } = useGameContext();
  const [gameIdData, setGameIdData] = useState([]);
  const [gameRecData, setGameRecData] = useState([]);
  const [id, setId] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const readMore = showFullText ? 2000 : 150;
  let displayedCount = 0;
  let location = useLocation();
  const images =
    Array.isArray(gameIdData.screenshots) &&
    gameIdData.screenshots.map((screenshot) => screenshot.image);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const textToggle = () => {
    setShowFullText(!showFullText);
  };
  async function getRecGame() {
    if (id != undefined) {
      try {
        const recGames = await fetchData(genre, platform, "popularity");
        const gameIdRes = await getGameById(id);
        setGameIdData(gameIdRes);
        setGameRecData(recGames);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error(error);
      }
    }
  }
  const handleStarClick = () => {
    if (isSaved) {
      // Remove the game from context
      removeGame(gameIdData.id);
    } else {
      // Save the game in context
      addGame(gameIdData);
    }
    // Toggle the isSaved state
    setIsSaved(!isSaved);
  };
  useEffect(() => {
    // Check if the game is saved in context
    const isGameSaved = savedGames.some((game) => game.id === gameIdData.id);
    setIsSaved(isGameSaved);
  }, [gameIdData.id, savedGames]);

  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
      setGenre(location.state.genre);
      setPlatform(location.state.platform);
    }
  }, [location.state]);
  useEffect(() => {
    if (id && parseInt(id) > 0) {
      getRecGame();
    }
  }, [id]);
  return (
    <div>
      <div className="gameInfo-page">
        <div className="gameInfo-main">
          <div className="smallGame">
            <img src={gameIdData.thumbnail} alt="NoImage Found" />
            <a
              href={gameIdData.game_url}
              target="blank"
              className="play-now-btn"
            >
              Play Now
            </a>
          </div>
          <div className="gameInfo-div">
            <div className="gameInfo-title">
              <h1 className="gameTitle">
                {gameIdData.title}
                {isSaved ? (
                  <FaStar onClick={handleStarClick} className="star" />
                ) : (
                  <FaRegStar onClick={handleStarClick} className="star" />
                )}
              </h1>
              <p className="short-description">
                {gameIdData.short_description}
              </p>
            </div>
            <div className="gameInfo-pictures">
              <img src={images[currentImageIndex]} alt="hello" loading="lazy" />

              <GrPrevious onClick={prevImage} className="prev-btn" />

              <GrNext onClick={nextImage} className="next-btn" />
            </div>
            <div
              className={`gameInfo-largedescription `}
              style={{ "max-height": `${readMore}px` }}
            >
              {gameIdData.description?.split("\n").map((paragraphs, index) => (
                <p toggle key={index} className="paragraphs">
                  {paragraphs}
                </p>
              ))}
            </div>
            {gameIdData.description &&
              (showFullText ? (
                <a onClick={textToggle} className="toggle-button">
                  - Show Less
                </a>
              ) : (
                <a onClick={textToggle} className="toggle-button">
                  + Show More
                </a>
              ))}
            <div>
              <div className="gameInfo-req-div">
                <div className="gameInfo-requirements">
                  <div className="gameInfo-platform ">
                    <p>Aditional Information</p>
                  </div>
                  <div className="gmaeInfo-req">
                    {gameIdData?.platform === "Web Browser" && (
                      <p className="gmaeInfo-req-p">
                        Platform <br />
                        <span>{gameIdData?.platform}</span>
                      </p>
                    )}
                    <p className="gmaeInfo-req-p">
                      Publisher <br /> <span>{gameIdData?.publisher}</span>
                    </p>
                    <p className="gmaeInfo-req-p">
                      Developer <br /> <span>{gameIdData?.developer}</span>
                    </p>
                    <p className="gmaeInfo-req-p">
                      Developer <br /> <span>{gameIdData?.developer}</span>
                    </p>
                    <p className="gmaeInfo-req-p">
                      Release Date <br />
                      <span>{gameIdData?.release_date}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {gameIdData.platform === "Windows" && (
                <h4 className="sys-requirements-text">System Requirements</h4>
              )}
              {gameIdData.platform === "Windows" && (
                <div className="gameInfo-req-div">
                  <div className="gameInfo-requirements">
                    <p className="gameInfo-platform ">{gameIdData.platform}</p>
                    <div className="gmaeInfo-req">
                      <p className="gmaeInfo-req-p">
                        OS version
                        <br />{" "}
                        <span>
                          {gameIdData.minimum_system_requirements?.os}
                        </span>
                      </p>
                      <p className="gmaeInfo-req-p">
                        CPU
                        <br />{" "}
                        <span>
                          {gameIdData.minimum_system_requirements?.processor}
                        </span>
                      </p>
                      <p className="gmaeInfo-req-p">
                        Memory
                        <br />{" "}
                        <span>
                          {gameIdData.minimum_system_requirements?.memory}
                        </span>
                      </p>
                      <p className="gmaeInfo-req-p">
                        GPU
                        <br />
                        <span>
                          {gameIdData.minimum_system_requirements?.graphics}
                        </span>
                      </p>
                      <p className="gmaeInfo-req-p">
                        Storage
                        <br />{" "}
                        <span>
                          {gameIdData.minimum_system_requirements?.storage}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h4 className="similar-games-to">
                  Similar Games to {gameIdData.title}
                </h4>
                <div className="similar-games-div">
                  {gameRecData.map((res, index) => {
                    if (displayedCount < 3 && res.id !== gameIdData.id) {
                      displayedCount++;
                      return <Card key={index} container={res} />;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Additional;
