import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Image } from "react-bootstrap";
import "../styles/MatchList.css";

const MatchList = ({ searchTerm }) => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const fixturesUrl = "https://v3.football.api-sports.io/fixtures?live=all";

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await axios.get(fixturesUrl, {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        },
      });
      const matchesData = response.data.response;
      setMatches(matchesData);
      setFilteredMatches(matchesData);

      const uniqueLeagues = Array.from(
        new Set(matchesData.map((match) => match.league.id))
      ).map((id) => {
        return matchesData.find((match) => match.league.id === id).league;
      });

      setLeagues(uniqueLeagues);
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    let filtered = matches;

    if (searchTerm) {
      filtered = filtered.filter(
        (match) =>
          match.teams.home.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          match.teams.away.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLeague) {
      filtered = filtered.filter(
        (match) => match.league.id === parseInt(selectedLeague)
      );
    }

    setFilteredMatches(filtered);
  }, [searchTerm, selectedLeague, matches]);

  return (
    <>
      <Form.Group controlId="leagueSelect" className="mb-4">
        <Form.Label className="league-text">Select League</Form.Label>
        <Form.Control
        className="league-select"
          as="select"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="">All Leagues</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <div className="match-list">
        {filteredMatches.map((match) => (
          <div key={match.fixture.id} className="match-item">
            <div className="header-row">
              <div className="league-name">
                <Image
                  src={match.league.logo}
                  alt={match.league.name}
                  width="30"
                />
                <span>
                  {match.league.name} - {match.league.country}
                </span>
              </div>
              <div className="match-time">
                {new Date(match.fixture.date).toLocaleString()}
              </div>
            </div>
            <Row className="align-items-center match-header">
              <Col xs={5} className="team-info text-right">
                <Image
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  width="30"
                />
                <span className="team-name">{match.teams.home.name}</span>
              </Col>
              <Col xs={2} className="score text-center">
                <strong>{match.goals.home}</strong> -{" "}
                <strong>{match.goals.away}</strong>
              </Col>
              <Col xs={5} className="team-info">
                <Image
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  width="30"
                />
                <span className="team-name">{match.teams.away.name}</span>
              </Col>
            </Row>
            <Row className="match-details text-center">
              <div className="match-status">
                Status: {match.fixture.status.long}
              </div>
              <Col className="venue">
                {match.fixture.venue.name}, {match.fixture.venue.city}
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default MatchList;
