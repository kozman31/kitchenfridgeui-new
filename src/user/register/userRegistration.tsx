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
          required:true,
        },
        value:'',
        label:'First name',
      },
      lastName:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
          name:'lastName',
          required:true,
        },
        value:'',
        label:'Last Name',
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'email@example.com',
          name:'email',
          required:true,
        },
        value:'',
        label:'Email Address',
      },
      username:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
          name:'username',
          required:true,
        },
        value:'',
        label:'Username',
      },
      password:{
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          name:'password',
          required:true,
        },
        value:'',
        label:'Password',
      },
      confirmPassword:{
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password',
          name:'confirmPassword',
          required:true,
        },
        value:'',
        label:'Confirm Password',
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
    updatedElement = {...updatedElement, value: event.currentTarget.value };
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
                  <FormInput elementType={el.elementType} onChange={this.state.onChange} elementConfig={el.elementConfig} value={el.value} label={el.label}/>
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