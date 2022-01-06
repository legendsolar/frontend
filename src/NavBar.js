import React from "react";
import { Navbar, Container, NavDropdown, Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { navigate } from "hookrouter";
function logOut() {
    signOut(auth);
    navigate("/signIn");
}

function NavBar(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Legends Wireframe</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link>Account</Nav.Link>
                        <Nav.Link>Portfolio</Nav.Link>
                        <Nav.Link>Transactions</Nav.Link>
                        <Nav.Link>Documents</Nav.Link>

                        <Button onClick={logOut()}>Log Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

NavBar.propTypes = {};

export default NavBar;
