import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoLogoGameControllerA } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import SavedGames from "../../Pages/SavedGames/SavedGames";
import Search from "../Search/Search";
import "./NavBar.css";

function NavBar() {
  const [sidePanelWidth, setSidePanelWidth] = useState(-100);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setSidePanelWidth(sidePanelWidth === 0 ? -100 : 0);
  };

  return (
    <div>
      <div className="header">
        <nav className={menuOpen ? "open" : ""}>
          <div className="phone-nav">
            <div className="logo-div">
              <IoLogoGameControllerA
                className="PageLogo"
                size={37}
                onClick={() => navigate("/LandingPage")}
              />

              <Link to="/LandingPage" className="logo">
                Budget Gamers
              </Link>
            </div>
            <div className="search-nav">
              <Search setMenuOpen={setMenuOpen} />
            </div>

            <div
              className="Menu"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <FaBars className="Bars" size={37} />
            </div>
          </div>
          <div className="links-div">
            <ul className="ul-links">
              <li>
                <NavLink to="/Top_Games" onClick={() => setMenuOpen(false)}>
                  Top Games
                </NavLink>
              </li>
              <li>
                <NavLink to="/Games" onClick={() => setMenuOpen(false)}>
                  Games
                </NavLink>
              </li>
              <li>
                <a
                  onClick={() => {
                    toggleSidePanel();
                    setMenuOpen(false);
                  }}
                >
                  Saved Games
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <SavedGames
            sidePanelWidth={sidePanelWidth}
            toggleSidePanel={toggleSidePanel}
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
