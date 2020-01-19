import React, { FormEvent } from 'react';
import FormInput from '../../forms/formInput';
import {API, loginSuccess}  from '../../store/actions';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

interface Props {
  registerUser: (regFormData:any)=>void;
}
class UserRegistration extends React.Component<Props,{}>  {

  state = {
    form:{
      firstName:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'First Name',
          name:'firstName',
        },
        value:'',
        label:'First name',
        touched: false,
        validation:{
          required:false,
        },
      },
      lastName:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
          name:'lastName',
        },
        value:'',
        label:'Last Name',
        touched: false,
        validation:{
          required:false,
        },
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'email@example.com',
          name:'email',
        },
        value:'',
        label:'Email Address',
        touched: false,
        validation:{
          required:true,
          rules:[
            {
              test: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email address",
            }
          ]
        },
      },
      username:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
          name:'username',
        },
        value:'',
        label:'Username',
        touched: false,
        validation:{
          required:true,
          rules:[
            {
              test: /^[a-zA-Z0-9-_]+$/,
              message: "Username must be alpha numeric",
            },
            {
              test: (username:string)=>username!="",
              message: "Please enter a username",
            },
          ]
        },
      },
      password:{
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          name:'password',
        },
        value:'',
        label:'Password',
        touched: false,
        validation:{
          required:true,
          rules:[
            {
              test: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              message: "Please choose a password greater than 8 characters",
            }
          ]
        },
      },
      confirmPassword:{
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password',
          name:'confirmPassword',
        },
        value:'',
        label:'Confirm Password',
        touched: false,
        validation:{
          required:true,
          rules:[
            {
              test:  /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              message: "",
            },
            {
              test:  (confirmedPW:string)=>confirmedPW === this.state.form.password.value,
              message: "Password does not match",
            }
          ]
        },
      },
    },
    onChange:(event:FormEvent<FormControl & HTMLInputElement>)=>this.handleChange(event)
  }
  constructor(props:any){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(event:FormEvent<HTMLFormElement>){
    console.log(event);
    event.preventDefault();
    const regFormData = {...this.state.form};
    this.props.registerUser(regFormData);
  }

  public handleChange(event:FormEvent<FormControl & HTMLInputElement>) {
    let updatedState: {[index:string]:any}
    const elementId = event.currentTarget.name;
    updatedState = { ...this.state.form};
    let updatedElement = updatedState[elementId];
    updatedElement = {...updatedElement, value: event.currentTarget.value, touched:true};
    updatedState = {...updatedState, [elementId]:updatedElement};
    this.setState({form:updatedState});
  }

  public render(){
    const registrationForm = true;
    const formObj: {[index:string]:any}= { ...this.state.form};
    // formObj = { ...this.state.form};
    const formArray=[];
    for (let key in formObj){
      formArray.push({
        key:key,
        ...formObj[key]
      })
    }
    let form = <form name="registrationForm" onSubmit={this.handleSubmit}>
                <div className="row">
        { formArray.map((el)=>{
                return <div key={el.key} className="justify-content-md-center col-6">
                  <FormInput elementType={el.elementType} onChange={this.state.onChange} validation={el.validation} touched={el.touched} elementConfig={el.elementConfig} value={el.value} label={el.label}/>
                  </div>
          })
        }
        </div>
        <div className="form-group text-center">
            <input type="submit" disabled={false} className="btn btn-dark btn-sm m-1" value="Submit" />
            <input type="button" className="btn btn-dark btn-sm m-1" value="Reset" />
          </div>
      </form>;

    return (
      <div className="container userRegistration">
        <div className="text-center">
          <h2>Register now</h2>
          <h5>to save your recipes and track your pantry</h5>
        </div>
        {form}
        <div className="text-info small text-center">
            After registering you will receive an email to activate your account. If you do not activate your account
            within 48 hours it will be deleted and you will need to register again.
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:any) =>{
  return {
    registerUser: (loginData:any) => {

        dispatch({type: API, payload:{
          url:'/todos/1',
          method:'GET',
          data:{...loginData},
          accessToken:'bearer',
          onSuccess:loginSuccess,
          onFailure:(error:any)=>console.log('Oops, An error occurred.', error),
          label:null,
          headers:null
          }
        })
      },
  }
}

export default connect(null, mapDispatchToProps)(UserRegistration);