import React, { FormEvent } from 'react';
import FormInput from '../../forms/formInput';
class UserRegistration extends React.Component  {

  state = {
    form:{
      firstName:{
        elementType: 'imput',
        elementConfig: {
          type: 'text',
          placeholder: 'First Name',
          name:'firstName'
        },
        value:'',
        label:'First name',
      },
      lastName:{
        elementType: 'imput',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
          name:'lastName'
        },
        value:'',
        label:'Last Name',
      },
    }
  }
  constructor(props:any){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(event:FormEvent<HTMLFormElement>){
    console.log(event);
    event.preventDefault();
  }

  public handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    console.log(event);
  }

  public render(){
    const registrationForm = true;
    return (
      <div className="container userRegistration">
        <div className="text-center">
          <h2>Register now</h2>
          <h5>to save your recipes and track your pantry</h5>
        </div>
        <form name="registrationForm" onSubmit={this.handleSubmit}>
          <div className="row justify-content-md-center">
            <div className="col-4">
              <FormInput elementType={this.state.form.firstName.elementType} elementConfig={this.state.form.firstName.elementConfig} value={this.state.form.firstName.value} label={this.state.form.firstName.label}/>
            </div>
            <div className="col-4">
              <FormInput inputtype="input" type="text" name="lastName" placeholder="Last Name" label="Last Name"/>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-4">
            <FormInput inputtype="input" type="text" name="email" placeholder="email@example.com" label="Email Address" required="true"/>
            </div>
            <div className="col-4">
              <FormInput inputtype="input" type="text" name="displayName" placeholder="Display Name" label="Display Name" required="true"/>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-4">
              <FormInput inputtype="input" type="text" name="password" placeholder="Password" label="Password" required="true"/>
            </div>
            <div className="col-4">
              <FormInput inputtype="input" type="text" name="confirmPassword" placeholder="Confirm Password" label="Confirm Password" required="true"/>
            </div>
          </div>
          <div className="form-group text-center">
            <input type="submit" disabled={registrationForm} className="btn btn-dark btn-sm m-1" value="Submit" />
            <input type="button" className="btn btn-dark btn-sm m-1" value="Reset" />
          </div>
        </form>
        <div className="text-info small text-center">
            After registering you will receive an email to activate your account. If you do not activate your account
            within 48 hours it will be deleted and you will need to register again.
        </div>
      </div>
    );
  }
}

export default UserRegistration;