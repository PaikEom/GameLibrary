import { useState, useEffect } from "react";
import "./Top10.css";
import SideCard from "../../Components/sideCard/sideCard";
import { fetchData } from "../../api";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
function NewReleases() {
  const [gamesReceived, setGameReceived] = useState([]);
  const [gameCategories, setGameCategories] = useState("");
  const [gamePlat, setGamePlat] = useState("");
  const [cVisibility, setVisibility] = useState({
    genres: false,
    platform: false,
  });

  const gameCategoriesWidth = cVisibility.genres ? 250 : 0;
  const gameCategoriesWidth2 = cVisibility.platform ? 145 : 0;
  let counter = 0;

  const genreMappings = {
    "Top Shooter": "shooter",
    "Top Battle Royale": "battle-royale",
    "Top MMORPG": "mmorpg",
    "	Top Strategy": "strategy",
    "Top MOBA": "moba",
    "Top Racing": "racing",
    "Top Sports": "sports",
    "Top ARPG": "action-rpg",
    "Top Fighting": "fighting",
    "Top Card": "card",
    "Top MMO": "mmo",
    All: "",
  };
  const platformMappings = {
    PC: "pc",
    Browser: "browser",
    All: "",
  };

  const toggleCategory = (category) => {
    setVisibility((prevVisibility) => {
      const newVisibility = { ...prevVisibility };

      // Close all other categories
      Object.keys(newVisibility).forEach((key) => {
        if (key !== category) {
          newVisibility[key] = false;
        }
      });

      // Toggle the selected category
      newVisibility[category] = !prevVisibility[category];

      return newVisibility;
    });
  };

  async function getData() {
    try {
      const data = await fetchData(gameCategories, gamePlat, "popularity");
      setGameReceived(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [gameCategories, gamePlat]);

  return (
    <div className="top-games">
      <div className="top-games-div">
        <h2>Top 10 Free to Play Games</h2>
        <div className="top-games-category-container">
          <div className="top-games-cat">
            <p onClick={() => toggleCategory("genres")} className="tag-main">
              Genres
              {cVisibility.genres ? (
                <TiArrowSortedDown className="right-arrow" />
              ) : (
                <TiArrowSortedUp className="down-arrow" />
              )}
            </p>

            <div
              className="category-Div"
              style={{ height: `${gameCategoriesWidth}px` }}
            >
              {Object.entries(genreMappings).map(([label, value]) => (
                <p
                  onClick={() => {
                    setGameCategories(value), toggleCategory("genres");
                  }}
                  key={label}
                  className="category-label"
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p onClick={() => toggleCategory("platform")} className="tag-main">
              Platform
              {cVisibility.platform ? (
                <TiArrowSortedDown />
              ) : (
                <TiArrowSortedUp />
              )}
            </p>
            <div
              className="category-Div2"
              style={{ height: `${gameCategoriesWidth2}px` }}
            >
              {Object.entries(platformMappings).map(([label, value]) => (
                <p
                  onClick={() => {
                    setGamePlat(value), toggleCategory("platform");
                  }}
                  key={label}
                  className="category-label"
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>
        {gamesReceived && gamesReceived.length === 0 ? (
          <>
            <p>No Games Found</p>
          </>
        ) : gamesReceived && gamesReceived.status === 0 ? (
          <>
            <p>No Games Found</p>
          </>
        ) : (
          <>
            {gamesReceived.map((res, index) => {
              if (counter < 10) {
                counter++;
                return <SideCard key={index} container={res} />;
              }
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default NewReleases;
