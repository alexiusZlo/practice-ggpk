import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NaviBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Sarkhanas</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/"> Articles </Link></Nav.Link>
                        <Nav.Link><Link to="/news"> News </Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="primary" className="mr-2">
                            Log In
                        </Button>
                        <Button variant="primary">Sign Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}