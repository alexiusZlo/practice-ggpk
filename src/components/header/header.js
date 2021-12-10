import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';

export default function NaviBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Sarkhanas</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>Articles</Nav.Link>
                        <Nav.Link>News</Nav.Link>
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