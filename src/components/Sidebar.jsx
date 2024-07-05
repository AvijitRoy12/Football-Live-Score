import React from "react";
import { ListGroup } from "react-bootstrap";
import "../styles/Sidebar.css";

const Sidebar = ({ selectedSport, onSelectSport }) => {
  const sports = ["Football", "Baseball", "Cricket", "Hockey", "Basketball"];

  return (
    <div className="sidebar">
      <ListGroup>
        {sports.map((sport) => (
          <ListGroup.Item
            key={sport}
            action
            active={selectedSport === sport.toLowerCase()}
            onClick={() => onSelectSport(sport.toLowerCase())}
            className={
              selectedSport === sport.toLowerCase() ? "active-item" : ""
            }
          >
            {sport}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
