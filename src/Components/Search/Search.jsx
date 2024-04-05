import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import GamesJson from "./freeGames.json";
import Fuse from "fuse.js";
import "./Search.css";
function Search({ props, setMenuOpen }) {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const fuse = new Fuse(GamesJson, {
    keys: ["title"],
    includeScore: true,
    threshold: 0.2,
  });
  const searchResults = fuse.search(searchText);

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

  const handleResultsClick = (res) => {
    const mappedGenre = genreMappings[res.item.genre];
    const mappedPlatform = platformMappings[res.item.platform];
    navigate("/gameInfor", {
      state: {
        id: res.item.id,
        genre: mappedGenre,
        platform: mappedPlatform,
      },
    });
  };
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleDeleteClick = () => {
    setSearchText("");
  };

  return (
    <div className="search-Main">
      <div className="search-input-div">
        <CiSearch className="search-logo" />
        <input
          type="text"
          value={searchText}
          placeholder="SearchGames"
          onChange={handleInputChange}
          onClick={() => setMenuOpen(false)}
        />
        {searchText && (
          <IoIosClose className="search-close" onClick={handleDeleteClick} />
        )}
      </div>
      <div className="search-results-container">
        {searchResults.map((res, index) => (
          <div
            className="search-result-main-div"
            onClick={() => {
              handleResultsClick(res);
              handleDeleteClick();
            }}
            key={index}
          >
            <img src={res.item.thumbnail} alt="noImage" />
            <div className="search-result-info">
              <h6>{res.item.title}</h6>
              <p>{res.item.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
