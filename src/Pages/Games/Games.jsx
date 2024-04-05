import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import "./Games.css";
import { fetchGamesByTag, fetchData } from "../../api";
import imge2 from "../../Images/imge2.jpg";
import { GrPrevious, GrNext } from "react-icons/gr";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
function Home() {
  //All useStates
  const [gamePlatform, setGamePlatform] = useState("");
  const [gameCategory, setGameCategory] = useState([]);
  const [container, setContainer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryVisibility, setCategoryVisibility] = useState({
    platforms: false,
    genres: false,
    graphics: false,
    combat: false,
    gameplay: false,
    setting: false,
    tag: false,
  });

  // Variables
  const itemsPerPage = 40;
  const plat = categoryVisibility.platform ? 95 : 0;
  const gamep = categoryVisibility.gameplay ? 250 : 0;
  const graph = categoryVisibility.graphics ? 250 : 0;
  const gen = categoryVisibility.genres ? 250 : 0;
  const btnwidth = gamePlatform || gameCategory.length > 0 ? 100 : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = container?.length
    ? container.slice(startIndex, endIndex)
    : [];
  const totalPages = Math.ceil(container?.length / itemsPerPage);

  // Game Categories
  const platforms = {
    PC: "pc",
    "Web Browser": "browser",
  };
  const genres = {
    MMO: "mmo",
    MMORPG: "mmorpg",
    Shooter: "shooter",
    Strategy: "strategy",
    MOBA: "moba",
    "Battle Royale": "battle-royale",
    Card: "card",
    Racing: "racing",
    Sports: "sports",
    Social: "social",
    Fighting: "fighting",
  };
  const graphics = {
    "3D Graphics": "3d",
    "2D Graphics": "2d",
  };
  const combat = {
    PVP: "pvp",
    PVE: "pve",
  };
  const gameplay = {
    "Turn-Based": "turn-based",
    "Real-Time": "real-time",
  };
  const setting = {
    Anime: "anime",
    Fantasy: "fantasy",
    "Sci-Fi": "sci-fi",
    Military: "military",
    Horror: "horror",
  };
  const tags = {
    MMOFPS: "mmofps",
    Sandbox: "sandbox",
    "Open World": "open-world",
    Survival: "Survival",
    "Action RPG": "action-rpg",
    MMORTS: "mmorts",
    Pixel: "pixel",
    Voxel: "voxel",
    MMOTPS: "mmotps",
    Zombie: "zombie",
    "First-Person": "first-person",
    "Top Down": "top-down",
    Tank: "tank",
    Space: "space",
    Sailing: "sailing",
    "Side Scroller": "side-scroller",
    Superhero: "superhero",
    Permadeath: "permadeath",
    Action: "action",
    "Martial Arts": "martial-arts",
    Flight: "flight",
    "Low Spec": "low-spec",
  };
  // Functions
  const toggleCategory = (category) => {
    setCategoryVisibility((prevVisibility) => {
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
  const filterByCategory = (category) => {
    setGameCategory((prevCategories) => {
      // Check if the category is already in the list
      const categoryIndex = prevCategories.indexOf(category);

      if (categoryIndex === -1) {
        // If not, add it to the list
        return [...prevCategories, category];
      } else {
        // If it's already in the list, remove it
        const updatedCategories = [...prevCategories];
        updatedCategories.splice(categoryIndex, 1);
        return updatedCategories;
      }
    });
    setCurrentPage(1);
  };
  const handleCheckboxChange = (platform) => {
    // Check if the platform is already selected
    if (gamePlatform === platform) {
      // If yes, unselect it
      setGamePlatform("");
    } else {
      // If not, select it
      setGamePlatform(platform);
    }
    setCurrentPage(1);
  };

  const handleDelete = () => {
    setGameCategory([]);
    setGamePlatform("");
    setCurrentPage(1);

    // Close all category visibility
    setCategoryVisibility((prevVisibility) => {
      const newVisibility = { ...prevVisibility };

      Object.keys(newVisibility).forEach((key) => {
        newVisibility[key] = false;
      });

      return newVisibility;
    });

    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handlePageChange = (newPage) => {
    // Ensure the newPage is within the valid range
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function getData() {
    try {
      if (gameCategory.length > 0) {
        const data = await fetchGamesByTag(
          gameCategory.join("."),
          gamePlatform
        );
        setContainer(data);
      } else {
        const data = await fetchData(null, gamePlatform, null);
        setContainer(data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [gameCategory, gamePlatform]);

  return (
    <div className="home-page">
      <div className="home-page-main-div">
        <div className="home-page-img">
          <img
            src={imge2}
            alt="No Image Found"
            className="categoryPage-main-img"
          />
          <h2>Find Your Perfect Fit</h2>
        </div>
        <h3 className="game-text">Filter Games</h3>
        <div className="category-container">
          <div className="game-category-div">
            <p onClick={() => toggleCategory("platform")} className="tag-main">
              Platform
              {categoryVisibility.platform ? (
                <TiArrowSortedDown />
              ) : (
                <TiArrowSortedUp />
              )}
            </p>
            <div className="category-div" style={{ height: `${plat}px` }}>
              {Object.keys(platforms).map((platform, index) => (
                <div className="category-input" key={index}>
                  <label htmlFor={platform}>
                    <input
                      type="checkbox"
                      value={platforms[platform]}
                      checked={gamePlatform === platforms[platform]}
                      onChange={() => handleCheckboxChange(platforms[platform])}
                      id={platform}
                      name={platform}
                    />
                    {platform}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="game-category-div">
            <p className="tag-main" onClick={() => toggleCategory("genres")}>
              Genres/Tags
              {categoryVisibility.genres ? (
                <TiArrowSortedDown className="right-arrow" />
              ) : (
                <TiArrowSortedUp className="down-arrow" />
              )}
            </p>

            <div className="category-div2" style={{ height: `${gen}px` }}>
              <div>
                <p className="classification">Genres</p>
                {Object.entries(genres).map(([label, value]) => (
                  <div key={label} className="category-input">
                    <label htmlFor={label}>
                      <input
                        type="checkbox"
                        onClick={() => filterByCategory(value)}
                        className={
                          gameCategory.includes(value) ? "selected" : ""
                        }
                        id={label}
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <p className="classification">Tags</p>
                {Object.entries(tags).map(([label, value]) => (
                  <div className="category-input" key={label}>
                    <label htmlFor={label}>
                      <input
                        type="checkbox"
                        onClick={() => filterByCategory(value)}
                        className={
                          gameCategory.includes(value) ? "selected" : ""
                        }
                        id={label}
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="game-category-div">
            <p className="tag-main" onClick={() => toggleCategory("graphics")}>
              Graphics/Combat
              {categoryVisibility.graphics ? (
                <TiArrowSortedDown className="right-arrow" />
              ) : (
                <TiArrowSortedUp className="down-arrow" />
              )}
            </p>
            <div className="category-div2" style={{ height: `${graph}px` }}>
              <div>
                <p className="classification">Graphics</p>
                {Object.entries(graphics).map(([label, value]) => (
                  <div key={label} className="category-input">
                    <label htmlFor={label}>
                      <input
                        type="checkbox"
                        onClick={() => filterByCategory(value)}
                        className={
                          gameCategory.includes(value) ? "selected" : ""
                        }
                        id={label}
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <div>
                  <p className="classification">Combat Style</p>
                  {Object.entries(combat).map(([label, value]) => (
                    <div key={label} className="category-input">
                      <label htmlFor={label}>
                        <input
                          type="checkbox"
                          onClick={() => filterByCategory(value)}
                          className={
                            gameCategory.includes(value) ? "selected" : ""
                          }
                          id={label}
                        />
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="game-category-div">
            <p onClick={() => toggleCategory("gameplay")} className="tag-main">
              Gameplay/Setting
              {categoryVisibility.gameplay ? (
                <TiArrowSortedDown className="down-arrow" />
              ) : (
                <TiArrowSortedUp className="up-arrow" />
              )}
            </p>
            <div className="category-div2" style={{ height: `${gamep}px` }}>
              <div>
                <p className="classification">Gameplay</p>
                {Object.entries(gameplay).map(([label, value]) => (
                  <div key={label} className="category-input">
                    <label htmlFor={label}>
                      <input
                        type="checkbox"
                        onClick={() => filterByCategory(value)}
                        className={
                          gameCategory.includes(value) ? "selected" : ""
                        }
                        id={label}
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <div>
                  <p className="classification">Setting</p>
                  {Object.entries(setting).map(([label, value]) => (
                    <div key={label} className="category-input">
                      <label htmlFor={label}>
                        <input
                          type="checkbox"
                          onClick={() => filterByCategory(value)}
                          className={
                            gameCategory.includes(value) ? "selected" : ""
                          }
                          id={label}
                        />
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: `${btnwidth}px` }} className="delete-btn-div">
          <button
            onClick={handleDelete}
            className="game-ran-btn2"
            style={{
              display:
                gamePlatform || gameCategory.length > 0 ? "block" : "none",
            }}
          >
            Delete All Filters
          </button>
        </div>

        <div className="home-games">
          {container && container.length === 0 ? (
            <p>No Games Found</p>
          ) : container && container.status === 0 ? (
            <p>No Games Found</p>
          ) : (
            <>
              {currentItems?.map((res, index) => (
                <Card key={index} container={res} />
              ))}
            </>
          )}
        </div>
        <div className="pagination-main-div">
          <div className="pagination-main">
            <GrPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="prev-page"
            >
              Previous
            </GrPrevious>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page, index, array) => {
                  // Show only the current page, two pages ahead, and the final page
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <div className="page-btn" key={index}>
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={currentPage === page ? "active" : ""}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  } else if (
                    (index === 1 && currentPage - 3 > 1) ||
                    (index === array.length - 2 && currentPage + 3 < totalPages)
                  ) {
                    return <span key={index}>...</span>;
                  }
                  return null; // Hide other pages
                }
              )}
            </div>
            <GrNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="next-page"
            >
              Next
            </GrNext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
