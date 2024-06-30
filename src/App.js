import React, { useState } from "react";
import "./App.css";
import MatchList from "./components/MatchList";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EuroCup from "./components/EuroCup";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch} />
        <main className="container mt-5">
          <Routes>
            <Route path="/" element={<MatchList searchTerm={searchTerm} />} />
            <Route path="/eurocup" element={<EuroCup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
