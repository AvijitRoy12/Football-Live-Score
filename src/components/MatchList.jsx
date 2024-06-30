import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const fixturesUrl = "https://v3.football.api-sports.io/fixtures?live=all";

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await axios.get(fixturesUrl, {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        },
      });
      setMatches(response.data.response);
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <ul>
        {matches.map((match) => (
          <li key={match.fixture.id}>
            <h2>
              {match.teams.home.name} vs {match.teams.away.name}
            </h2>
            <p>Date: {new Date(match.fixture.date).toLocaleString()}</p>
            <p>
              Venue: {match.fixture.venue.name}, {match.fixture.venue.city}
            </p>
            <p>
              Score: {match.goals.home} - {match.goals.away}
            </p>
            <p>Status: {match.fixture.status.long}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
