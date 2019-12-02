import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';

class NavBar extends React.Component {
  public render(){
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to='/'>KF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <NavDropdown title="Recipes" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='register'>Add Recipe</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='register'>View Recipes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pantry" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='pantry'>Add Item</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='pantry'>View Pantry</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown alignRight title="Login" id="basic-nav-dropdown">
                <Form inline>
                    <FormControl type="text" placeholder="Email address" size="sm" className="m-2" />
                    <FormControl type="text" placeholder="Password" size="sm" className="m-2" />
                    <Button variant="dark" size="sm" className="mr-auto ml-auto">Login</Button>
                </Form>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to='register' className="pt-0 pb-o"><small>Sign Up</small></NavDropdown.Item>
                <NavDropdown.Item as={Link} to='pantry' className="pt-0 pb-o"><small>Forgot Password?</small></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;