import React from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand href="#home">AllSports Live</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="mx-auto">
            <Nav.Link href="#live-scores">Live Scores</Nav.Link>
            <Nav.Link href="#schedule">Schedule</Nav.Link>
            <Nav.Link href="#archives">Archives</Nav.Link>
            <NavDropdown title="News" id="news-nav-dropdown">
              <NavDropdown.Item href="#latest-news">
                Latest News
              </NavDropdown.Item>
              <NavDropdown.Item href="#trending">Trending</NavDropdown.Item>
              <NavDropdown.Item href="#highlights">Highlights</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Series" id="series-nav-dropdown">
              <NavDropdown.Item href="#ongoing-series">
                Ongoing Series
              </NavDropdown.Item>
              <NavDropdown.Item href="#upcoming-series">
                Upcoming Series
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Teams" id="teams-nav-dropdown">
              <NavDropdown.Item href="#team-rankings">
                Team Rankings
              </NavDropdown.Item>
              <NavDropdown.Item href="#team-info">Team Info</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Rankings" id="rankings-nav-dropdown">
              <NavDropdown.Item href="#player-rankings">
                Player Rankings
              </NavDropdown.Item>
              <NavDropdown.Item href="#team-rankings">
                Team Rankings
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#more">More</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#profile">
              <Image
                src="path_to_profile_image.jpg"
                roundedCircle
                height="30"
                width="30"
                alt="User Profile"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
