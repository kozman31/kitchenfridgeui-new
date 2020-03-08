import React, { FormEvent } from 'react';
import { Button, FormControl, Form, Col } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess, loginFailed, API } from '../../store/actions';

export interface Props extends RouteComponentProps<{token:string}> {
  onLogIn: (loginData:any) => void;
  onLogOut: () => void;
  user: {
    username:string,
    authorities: [],
  };
  loggedIn:boolean;
}

export interface State {
  loginForm:{
    username:{value:""},
    password:{value:""}
  },
  user: {
    username:string,
    authorities: [],
  }
  loggedIn:boolean
}
class LoginForm extends React.Component<Props, {}>   {

  state = {
    loginForm:{
      username:{value:""},
      password:{value:""}
    }
  }

  componentDidMount () {
    const { token }  = this.props.match.params;
    console.log(token);
    
  }

  loginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = {...this.state.loginForm};
    this.props.onLogIn(loginData);
  }

  componentDidUpdate(){
    if(this.props.loggedIn && (this.state.loginForm.username.value!=="" || this.state.loginForm.password.value!=="")){
    const updatedloginForm = {...this.state.loginForm, username:{value:""}, password:{value:""}};
    this.setState({loginForm:updatedloginForm});
    }
  }

  changeHandler = (event: FormEvent<FormControl & HTMLInputElement>) => {
    const elementId = event.currentTarget.name;
    const updatedloginForm = { ...this.state.loginForm, [elementId]:{value:event.currentTarget.value }};
    this.setState({loginForm:updatedloginForm});
  }

  public render(){
    return (
      <Col md={{ span: 6, offset: 3 }} className="justify-content-md-center">
         <Form onSubmit={this.loginHandler} name="loginForm">
            <FormControl type="text" name="username" autoComplete="username" onChange={(event:FormEvent<FormControl & HTMLInputElement>)=>this.changeHandler(event)} value={this.state.loginForm.username.value} placeholder="Username" size="sm" className="mt-2 mb-2" />
            <FormControl type="password" name="password" autoComplete="current-password" onChange={(event:FormEvent<FormControl & HTMLInputElement>)=>this.changeHandler(event)} value={this.state.loginForm.password.value} placeholder="Password" size="sm" className="mt-2 mb-2" />
            <Button variant="dark" type="submit" size="sm" className="ml-auto mr-auto">Login</Button>
        </Form>
        <div><Link to='register' className="pt-0 pb-o"><small>Sign Up</small></Link></div>
        <div><Link to='' className="pt-0 pb-o"><small>Forgot Password?</small></Link></div>
      </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);