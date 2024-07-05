import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Collapse } from "react-bootstrap";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../styles/Scoreboard.css";

const Scoreboard = ({ selectedSport, searchTerm }) => {
  const [data, setData] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Define the API URLs for football and baseball
  const apiUrls = {
    football: "https://v3.football.api-sports.io/fixtures?live=all",
    baseball: "https://v1.baseball.api-sports.io/leagues",
  };

  // Fetch data based on the selected sport
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrls[selectedSport], {
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": process.env.REACT_APP_API_HOST,
          },
        });

        if (selectedSport === "football") {
          setData(response.data.response); // Set football data
        } else if (selectedSport === "baseball") {
          setData(response.data.response); // Set baseball data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSport]);

  // Function to toggle the expanded state of a card
  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  // Filter the data based on the search term
  const filteredData = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="scoreboard">
      <h2 className="text-center my-4">
        {selectedSport.toUpperCase()} Scoreboard
      </h2>
      <Row>
        {filteredData.map((item) => (
          <Col key={item.id} md={12} className="mb-4">
            <Card className="shadow-sm score-card">
              <Card.Body>
                {selectedSport === "football" ? (
                  <>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>{item.league.name}</span>
                      <img
                        src={item.league.logo}
                        alt={item.league.name}
                        width="30"
                        height="30"
                      />
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {item.league.country} - {item.league.round} -{" "}
                      {item.fixture.date}
                    </Card.Text>
                    <Card.Text>
                      <img
                        src={item.teams.home.logo}
                        alt={item.teams.home.name}
                        width="20"
                        height="20"
                      />
                      {item.teams.home.name} vs
                      <img
                        src={item.teams.away.logo}
                        alt={item.teams.away.name}
                        width="20"
                        height="20"
                      />
                      {item.teams.away.name}
                    </Card.Text>
                    <Card.Text>
                      {item.score.fulltime.home !== null ? (
                        <>
                          {item.score.fulltime.home} -{" "}
                          {item.score.fulltime.away}
                        </>
                      ) : (
                        <>Match not started yet</>
                      )}
                    </Card.Text>
                    <div
                      className="expand-icon"
                      onClick={() => toggleExpand(item.fixture.id)}
                      aria-controls={`collapse-${item.fixture.id}`}
                      aria-expanded={expandedCardId === item.fixture.id}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {expandedCardId === item.fixture.id ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </div>
                    <Collapse in={expandedCardId === item.fixture.id}>
                      <div id={`collapse-${item.fixture.id}`}>
                        <Card.Text>Referee: {item.fixture.referee}</Card.Text>
                        <Card.Text>
                          Venue: {item.fixture.venue.name},{" "}
                          {item.fixture.venue.city}
                        </Card.Text>
                        <Card.Text>
                          Status: {item.fixture.status.long}
                        </Card.Text>
                      </div>
                    </Collapse>
                  </>
                ) : (
                  <>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>{item.name}</span>
                      <img
                        src={item.logo}
                        alt={item.name}
                        width="30"
                        height="30"
                      />
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {item.country.name}
                    </Card.Text>
                    <div
                      className="expand-icon"
                      onClick={() => toggleExpand(item.id)}
                      aria-controls={`collapse-${item.id}`}
                      aria-expanded={expandedCardId === item.id}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {expandedCardId === item.id ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </div>
                    <Collapse in={expandedCardId === item.id}>
                      <div id={`collapse-${item.id}`}>
                        <Card.Text>Type: {item.type}</Card.Text>
                        {item.seasons.map((season) => (
                          <Card.Text key={season.season}>
                            Season: {season.season}, Start: {season.start}, End:{" "}
                            {season.end}
                          </Card.Text>
                        ))}
                      </div>
                    </Collapse>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Scoreboard;
