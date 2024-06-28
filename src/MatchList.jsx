import React, { useEffect, useState } from "react";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        "https://v3.football.api-sports.io/fixtures?live=all",
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "xxxxxxxx",
          },
        }
      );
      const data = await response.json();
      setMatches(data.response);
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
