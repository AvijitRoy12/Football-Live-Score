import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";

const EuroCup = () => {
  const [leagues, setLeagues] = useState([]);
  const leaguesUrl = "https://v3.football.api-sports.io/leagues";

  useEffect(() => {
    const fetchLeagues = async () => {
      const response = await axios.get(leaguesUrl, {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        },
      });
      const euroCupData = response.data.response.filter(
        (league) => league.league.name === "Euro Championship"
      );
      setLeagues(euroCupData);
    };

    fetchLeagues();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Euro Championship</h2>
      <Row>
        {leagues.map((league) => (
          <Col key={league.league.id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={league.league.logo}
                  alt={league.league.name}
                />
                <Card.Title>{league.league.name}</Card.Title>
                <Card.Text>Country: {league.country.name}</Card.Text>
                <Card.Text>Seasons:</Card.Text>
                <ul>
                  {league.seasons.map((season) => (
                    <li key={season.year}>
                      {season.year}: {season.start} - {season.end}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EuroCup;
