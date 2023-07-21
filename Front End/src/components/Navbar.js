import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./NavBar.css";
import { useEffect } from "react";
function NavBar() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>Task</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isLoggedIn ? (
            <div>
              <p
                className="material-symbols-outlined"
                style={{ background: "white" }}
              >
                account_circle
              </p>
              <Button
                variant="dark"
                className="navButton"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/">
              <Button variant="dark" className="navButton">
                Login
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
