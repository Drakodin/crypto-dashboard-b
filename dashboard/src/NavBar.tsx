import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar>
                <Container>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#Dashboard'>Dashboard</Nav.Link>
                            <Nav.Link href='#Holdings'>Your Holdings</Nav.Link>
                            <Nav.Link href='#Browse'>Browse Assets</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;