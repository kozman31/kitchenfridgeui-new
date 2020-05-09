import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Navbar, Nav, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';
import {loginFailed, API, loginSuccess, logOut}  from '../store/actions';


  export interface Props {
    onLogIn: (loginData:any) => void;
    onLogOut: () => void;
    user: {
      username:string,
      authorities: [],
    };
    loggedIn:boolean;
  }

  export interface State {
    navLogin:{
      username:{value:""},
      password:{value:""}
    },
    user: {
      username:string,
      authorities: [],
    }
    loggedIn:boolean
  }

class NavBar extends React.Component<Props, {}> {

  state = {
    navLogin:{
      username:"",
      password:""
    }
  }

  loginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = {...this.state.navLogin};
    this.props.onLogIn(loginData);
  }

  logoutHandler = () =>{
    const updatedNavLogin = {...this.state.navLogin, username:"", password:""};
    this.setState({navLogin:updatedNavLogin});
    this.props.onLogOut();
    
  }

  componentDidUpdate(){
    if(this.props.loggedIn && (this.state.navLogin.username!=="" || this.state.navLogin.password!=="")){
    const updatedNavLogin = {...this.state.navLogin, username:"", password:""};
    this.setState({navLogin:updatedNavLogin});
    }
  }

  changeHandler = (event: FormEvent<FormControl & HTMLInputElement>) => {
    const elementId = event.currentTarget.name;
    const updatedNavLogin = { ...this.state.navLogin, [elementId]:event.currentTarget.value };
    this.setState({navLogin:updatedNavLogin});
  }

  public render(){
    let userDropDown = <NavDropdown alignRight title="Login" id="basic-nav-dropdown">
                        <Form inline onSubmit={this.loginHandler} name="navLogin">
                            <FormControl type="text" name="username" autoComplete="username" onChange={(event:ChangeEvent<FormControl & HTMLInputElement>)=>this.changeHandler(event)} value={this.state.navLogin.username} placeholder="Username" size="sm" className="m-2" />
                            <FormControl type="password" name="password" autoComplete="current-password" onChange={(event:ChangeEvent<FormControl & HTMLInputElement>)=>this.changeHandler(event)} value={this.state.navLogin.password} placeholder="Password" size="sm" className="m-2" />
                            <Button variant="dark" type="submit" size="sm" className="mr-auto ml-auto">Login</Button>
                        </Form>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item as={Link} to='/register' className="pt-0 pb-o"><small>Sign Up</small></NavDropdown.Item>
                        <NavDropdown.Item className="pt-0 pb-o"><small>Forgot Password?</small></NavDropdown.Item>
                    </NavDropdown>
    if(this.props.loggedIn) {
      userDropDown= <NavDropdown alignRight title="Login" id="basic-nav-dropdown">                  
                        <NavDropdown.Item onClick={this.logoutHandler} className="pt-0 pb-o"><small>log out</small></NavDropdown.Item>
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
              <NavDropdown.Item as={Link} to='/addrecipe'>Add Recipe</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/register'>View Recipes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pantry" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/pantry'>Add Item</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/pantry'>View Pantry</NavDropdown.Item>
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
          url:'/login',
          method:'POST',
          data:{...loginData},
          accessToken:'',
          onSuccess:loginSuccess,
          onFailure:loginFailed,
          label:null,
          headers:null
          }
        })
      },
      onLogOut: ()=>{
        const action = logOut();
        dispatch(action)
      },

  }
}

const mapStateToProps = (state: State) => {
  return {
    user:{
      username: state.user.username,
      authorities: state.user.authorities,
    },
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);