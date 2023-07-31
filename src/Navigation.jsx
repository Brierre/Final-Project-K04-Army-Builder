import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary nav-stuff">
            <Container fluid>
                <Navbar.Brand href="#">K04 Army Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">My Army</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">View Factions</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                View Faction Rules
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action5">
                                View Detachments
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action6">
                                View Detachment Rules
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action7">
                                View Emhancements
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action8">
                                View Stratagems
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;