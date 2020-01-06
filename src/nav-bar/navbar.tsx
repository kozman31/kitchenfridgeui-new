import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Navbar, Nav, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';
import {LOG_OUT, API, login}  from '../store/actions';



  export interface Props {
    onLogIn: (loginData:any) => void;
    onLogOut: () => void;
    user: {
      username:String,
      email: String
    };
    loggedIn:Boolean;
  }

  export interface State {
    navLogin:{
      email:"",
      password:""
    },
    user: {
      username:String,
      email: String
    }
    loggedIn:false
  }

class NavBar extends React.Component<Props, {}> {

  state = {
    navLogin:{
      email:"",
      password:""
    }
  }

  constructor(props: Props) {
    super(props);
  }

  loginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = {...this.state.navLogin};
    this.props.onLogIn(loginData);
  }

  logoutHandler = () =>{
    const updatedNavLogin = {...this.state.navLogin, email:"", password:""};
    this.setState({navlogin:updatedNavLogin});
    
  }

  

  changeHandler = (event: FormEvent<FormControl & HTMLInputElement>, elementId: string) => {
    const updatedNavLogin = { ...this.state.navLogin, [elementId]:event.currentTarget.value };
    this.setState({navLogin:updatedNavLogin});
  }

  public render(){

    let userDropDown = <NavDropdown alignRight title="Login" id="basic-nav-dropdown">
                        <Form inline onSubmit={this.loginHandler} name="navLogin">
                            <FormControl type="text" id="email" onChange={(event:FormEvent<FormControl & HTMLInputElement>)=>this.changeHandler(event, "email")} value={this.state.navLogin.email} placeholder="Email address" size="sm" className="m-2" />
                            <FormControl type="password" id="password" onChange={(event:FormEvent<FormControl & HTMLInputElement>)=>this.changeHandler(event, "password")} value={this.state.navLogin.password} placeholder="Password" size="sm" className="m-2" />
                            <Button variant="dark" type="submit" size="sm" className="mr-auto ml-auto">Login</Button>
                        </Form>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to='register' className="pt-0 pb-o"><small>Sign Up</small></NavDropdown.Item>
                        <NavDropdown.Item onClick={this.props.onLogOut} className="pt-0 pb-o"><small>Forgot Password?</small></NavDropdown.Item>
                    </NavDropdown>

    if(this.props.loggedIn) {
      userDropDown= <NavDropdown alignRight title="Login" id="basic-nav-dropdown">                  
                        <NavDropdown.Item onClick={this.props.onLogOut} className="pt-0 pb-o"><small>log out</small></NavDropdown.Item>
                        </NavDropdown>;
    }
  
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
            <Navbar.Text>{this.props.user.username}</Navbar.Text>
          </Nav>
          <Nav>
            {userDropDown}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch:any) =>{
  return {
      onLogIn: (loginData:any) => {
        dispatch({type: API, payload:{
          url:'/todos/1',
          method:'GET',
          data:{...loginData},
          accessToken:'bearer',
          onSuccess:login,
          onFailure:(error:any)=>console.log('Oops, An error occurred.', error),
          label:null,
          headers:null
          }
        })
      },
      onLogOut: () => dispatch({type: LOG_OUT, payload:{}}),

  }
}

const mapStateToProps = (state: State) => {
  return {
    user:{
      username: state.user.username,
      email: state.user.email
    },
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);