import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component {
    render() {
        return (
            <div id='nav'>
                <Navbar variant="dark">
                    <Container>
                        <Navbar.Collapse>
                            <Nav>
                                <Nav.Link className='link' href='/dashboard'>Dashboard</Nav.Link>
                                <Nav.Link className='link' href='/holdings'>Your Holdings</Nav.Link>
                                <Nav.Link className='link' href='/browse'>Browse Assets</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;