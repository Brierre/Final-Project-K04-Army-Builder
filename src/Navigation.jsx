import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle, PersonHeart } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Navigation({ isLoggedIn, onLogin, onLogout }) {
    return (
        <Navbar expand="sm" className="bg-body-tertiary nav-stuff">
            <Container fluid>
                <Navbar.Brand href="#">K04 Army Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link href="#action2">My Army Page</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/faction-rules">View Faction Rules</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/detachment-rules">View Detachment Rules</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/enhancements">View Enhancements</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/stratagems">View Stratagems</NavDropdown.Item>
                        </NavDropdown>
                        {isLoggedIn ? (
                            <Link to="/user"><PersonHeart /></Link>
                        ) : (
                            <Link to="/login"><PersonCircle /></Link>
                        )}
                        <Button onClick={isLoggedIn ? onLogout : onLogin}>
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;