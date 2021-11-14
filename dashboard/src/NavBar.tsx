import { render } from '@testing-library/react';
import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Dashboard from './Dashboard';
import Holdings from './Holdings';
import Browse from './Browse';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar fixed='top' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                            <Nav.Link href='/holdings'>Your Holdings</Nav.Link>
                            <Nav.Link href='/browse'>Browse Assets</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;