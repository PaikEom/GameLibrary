import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import "./Footer.css";
function Footer() {
  const [quickLink, setQuickLink] = useState(false);
  const [operation, setOperation] = useState(false);
  const [contact, setContact] = useState(false);

  const navigate = useNavigate();

  const aboutHeight = operation ? 300 : 0;
  const quickHeight = quickLink ? 300 : 0;
  const contactHeight = contact ? 300 : 0;

  const toggleSection = () => {
    setOperation(!operation);
  };
  const toggleQuick = () => {
    setQuickLink(!quickLink);
  };

  const toggleContact = () => {
    setContact(!contact);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="small-footer" onClick={() => toggleSection()}>
            <h4>About</h4>
            {operation ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          <div
            style={{ "max-height": `${aboutHeight}px` }}
            className="hiden-content"
          >
            <p>Your Free To Play Game Library, for PC and Web Games.</p>
          </div>
        </div>

        <div className="footer-section">
          <div className="small-footer" onClick={() => toggleQuick()}>
            <h4>Quick Links</h4>
            {quickHeight ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          <div
            style={{ "max-height": `${quickHeight}px` }}
            className="hiden-content"
          >
            <ul>
              <li>
                <a
                  onClick={() => navigate("/LandingPage")}
                  className="quick-links"
                >
                  Home
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/Games")} className="quick-links">
                  Games
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/Top_Games")}
                  className="quick-links"
                >
                  Top Games
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-section">
          <div className="small-footer" onClick={() => toggleContact()}>
            <h4>Contact</h4>
            {contact ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          <div
            style={{ "max-height": `${contactHeight}px` }}
            className="hiden-content"
          >
            <p>Email: example@gmail.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
      <div className="outLinks">
        <div className="innerLinks">
          <MdEmail size={40} className="email" />
          <FaLinkedinIn size={40} className="linked" />

          <FaGithub size={40} />
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          All the information from this page was gather from the{" "}
          <a href="https://www.freetogame.com/api-doc" target="_blank">
            FREETOGAME
          </a>{" "}
          api
        </p>
      </div>
    </footer>
  );
}

export default Footer;
