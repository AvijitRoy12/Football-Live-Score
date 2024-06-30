import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const profileImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s";

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate("/");
    onSearch(searchTerm);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <div className="container-fluid">
        <Navbar.Brand href="#home">Sport Sphere</Navbar.Brand>
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
            <LinkContainer to="/eurocup">
              <Nav.Link>EuroCup</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="search"
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          <Nav>
            <Nav.Link href="#profile">
              <Image
                src={profileImage}
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
