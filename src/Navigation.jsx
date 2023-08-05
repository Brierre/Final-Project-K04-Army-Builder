import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle, PersonHeart } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Navigation({ isLoggedIn, username, onLogout }) {
    const handleLogout = () => {
        onLogout();
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">K04 Army Builder</Navbar.Brand>
                    <Nav className="me-auto" style={{ maxHeight: '100px' }} >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/my-army-page">My Armies</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to="/faction-rules">View Faction Rules</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/detachment-rules">View Detachment Rules</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/enhancements">View Enhancements</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/stratagems">View Stratagems</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/army-options">Army Options</NavDropdown.Item>
                        </NavDropdown>
                        {isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                <PersonHeart style={{ marginRight: '5px' }} />
                                Welcome, {username}
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <PersonCircle /> Login to do fun stuff!
                            </Link>
                        )}
                        {/* <Button onClick={isLoggedIn ? onLogout : onLogin}>
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </Button> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}



export default Navigation;