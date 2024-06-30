import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Collapse, Form } from "react-bootstrap";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const MatchList = ({ searchTerm }) => {
  const [matches, setMatches] = useState([]);
  const [expandedMatchId, setExpandedMatchId] = useState(null);
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

  const toggleExpand = (matchId) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  return (
    <>
      <h2 className="text-center my-4">Score Board</h2>
      <Form.Group controlId="leagueSelect" className="mb-4">
        <Form.Label>Select League</Form.Label>
        <Form.Control
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
      <Row>
        {filteredMatches.map((match) => (
          <Col key={match.fixture.id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  {match.teams.home.name} vs {match.teams.away.name}
                </Card.Title>
                <Card.Text>
                  <img
                    src={match.league.logo}
                    alt={match.league.name}
                    width="20"
                    height="20"
                  />{" "}
                  {match.league.name} - {match.league.country}
                </Card.Text>
                <Card.Text>
                  Score: {match.goals.home} - {match.goals.away}
                </Card.Text>
                <div
                  className="expand-icon"
                  onClick={() => toggleExpand(match.fixture.id)}
                  aria-controls={`match-collapse-${match.fixture.id}`}
                  aria-expanded={expandedMatchId === match.fixture.id}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {expandedMatchId === match.fixture.id ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>
                <Collapse in={expandedMatchId === match.fixture.id}>
                  <div id={`match-collapse-${match.fixture.id}`}>
                    <Card.Text>
                      Date: {new Date(match.fixture.date).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      Venue: {match.fixture.venue.name},{" "}
                      {match.fixture.venue.city}
                    </Card.Text>
                    <Card.Text>Status: {match.fixture.status.long}</Card.Text>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MatchList;
