import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../api";
import jsonData from "../../Components/Search/freeGames.json";
import SideCard from "../../Components/sideCard/sideCard";
import Card from "../../Components/Card/Card";
import Image1 from "../../Images/image1.jpg";
import "./LandingPage.css";
function FavoriteGames() {
  const [randomGames, setRandomGames] = useState([]);
  const [gamesRecieved, setGameRecieved] = useState([]);
  const [newGamesR, setNewGamesR] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [generateGames, setGenerateGame] = useState(true);

  let counter = 0;
  let counter2 = 0;
  let counter3 = 0;
  let neverChange;

  const handleGenerateGame = () => {
    setGenerateGame(!generateGames);
  };
  async function getData() {
    try {
      const data = await fetchData(null, null, "popularity");
      const data2 = await fetchData(null, null, "release-date");
      setGameRecieved(data);
      setNewGames(data2);
      setNewGamesR(data2.slice(-5));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [neverChange]);
  useEffect(() => {
    const getRandomIndices = (max, count) => {
      const indices = [];
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    };
    const randomIndices = getRandomIndices(jsonData.length, 4);
    const selectedGames = randomIndices.map((index) => jsonData[index]);
    setRandomGames(selectedGames);
  }, [generateGames]);

  return (
    <div className="landingPage">
      <div className="landingPage-content">
        <div className="landingPage-img-div">
          <img
            src={Image1}
            alt="No Image"
            className="landingPage-main-img"
            loading="lazy"
          />
          <h1>Explore A World Of Top-notch Free-To-Play Games</h1>
          <Link to={"/Games"} className="Browser-link">
            Browse
          </Link>
        </div>
        <div className="popularGames-div">
          <h2>Popular Games</h2>
          <div className="popularGames-iner-div">
            {gamesRecieved.map((res, index) => {
              if (counter < 4) {
                counter++;
                return <Card key={index} container={res} />;
              }
            })}
          </div>
        </div>
        <div>
          <div className="sideCards-div">
            <div className="newerGames">
              <h3>Newer Games</h3>
              {newGames.map((res, index) => {
                if (counter2 < 5) {
                  counter2++;
                  return <SideCard key={index} container={res} />;
                }
              })}
            </div>

            <div className="olderGames">
              <h3>Older Games</h3>
              {newGamesR.map((res, index) => {
                if (counter3 < 5) {
                  counter3++;
                  return <SideCard key={index} container={res} />;
                }
              })}
            </div>
          </div>
          <div>
            {gamesRecieved.map((res, index) => {
              if (counter < 4) {
                counter++;
                return <Card key={index} container={res} />;
              }
            })}
          </div>
          <div className="popularGames-div">
            <h2>Try Something Different</h2>
            <div className="popularGames-iner-div">
              {randomGames.map((res, index) => (
                <Card container={res} key={index} />
              ))}
            </div>
            <div className="game-ran-div">
              <button onClick={handleGenerateGame} className="game-ran-btn">
                Game Randomizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteGames;

// Image source https://www.vecteezy.com/photo/26481506-a-spectacular-gaming-adventure-with-this-stunning-4k-wallpaper
