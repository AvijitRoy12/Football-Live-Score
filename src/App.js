import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchList from "./components/MatchList";
import NavBar from "./components/NavBar";
import EuroCup from "./components/EuroCup";
import Sidebar from "./components/Sidebar";
import News from "./components/News";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("football");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectSport = (sport) => {
    setSelectedSport(sport);
  };

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch} />
        <div className="content-wrapper">
          <div className="sidebar">
            <Sidebar
              selectedSport={selectedSport}
              onSelectSport={handleSelectSport}
            />
          </div>
          <div className="main-content">
            <main>
              <Routes>
                <Route
                  path="/"
                  element={<MatchList searchTerm={searchTerm} />}
                />
                <Route path="/eurocup" element={<EuroCup />} />
              </Routes>
            </main>
          </div>
          <div className="news">
            <News />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
