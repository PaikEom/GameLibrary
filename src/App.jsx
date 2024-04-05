import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Games from "./Pages/Games/Games";
import Top10 from "./Pages/Top10/Top10";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Additional from "./Pages/Additional/Additional";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Top_Games" element={<Top10 />} />

          <Route path="/Games" element={<Games />} />
          <Route path="/gameInfor" element={<Additional />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
