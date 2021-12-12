import React from 'react';
import { Nav, Navbar, Button, Container, Row, Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Routes,//==Switch in 'react-router-dom' v6
    Link
} from 'react-router-dom';
import Home from '../../pages/homePage/homePage';
import News from '../../pages/news/news';

export default function NaviBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Sarkhanas</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Container>
                            <Row>
                                <Col>
                                    <Nav className="mr-auto" >
                                        <Nav.Link href="/">Articles</Nav.Link>
                                        <Nav.Link href="/news">News</Nav.Link>
                                    </Nav>
                                </Col>
                                <Col me='auto'>
                                    <Nav className="justify-content-end">
                                        <Button variant="primary" className="me-md-2">
                                            Log In
                                        </Button>
                                        <Button variant="primary">Sign Out</Button>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Router>
                <Routes>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/news" component={News} />
                </Routes>
            </Router>
        </>
    )
}