import React from 'react';
import {Navbar, Nav, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';

class NavBar extends React.Component {
  public render(){
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">KF</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Recipes" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Add Recipe</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">View Recipes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pantry" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Add Item</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">View Pantry</NavDropdown.Item>
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
                <NavDropdown.Item href="#action/3.1" className="pt-0 pb-o"><small>Sign Up</small></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="pt-0 pb-o"><small>Forgot Password?</small></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;