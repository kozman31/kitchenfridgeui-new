import React, { FormEvent } from 'react';
import FormInput from '../../forms/formInput';
import {API, registerFailed, registerSuccess}  from '../../store/actions';
import { FormControl, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { parseInputToJSON } from '../../tools/jsonParsers';

interface Props {
  registerUser: (regFormData:any)=>void;
}
interface rule{
  test: any,
  message: string
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
          required:false,
        },
        value:'',
        label:'First name',
        touched: false,
      },
      lastName:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
          name:'lastName',
          required:false,
        },
        value:'',
        label:'Last Name',
        touched: false,
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
        touched: false,
        hasError:true,
        errorMsg:[],
        validation:{
          rules:[
            {
              test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          required:true,
        },
        value:'',
        label:'Username',
        touched: false,
        hasError:true,
        errorMsg:[],
        validation:{
          rules:[
            {
              test: /^[a-zA-Z0-9-_]+$/,
              message: "Username must be alpha numeric",
            },
            {
              test: (username:string)=>username!=="",
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
          autoComplete:'new-password',
          required:true,
        },
        value:'',
        label:'Password',
        touched: false,
        hasError:true,
        errorMsg:[],
        validation:{
          rules:[
            {
              test: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              message: "Password must be greater than 8 characters",
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
          autoComplete:'new-password',
          required:true,
        },
        value:'',
        label:'Confirm Password',
        touched: false,
        hasError:true,
        errorMsg:[],
        validation:{
          rules:[
            {
              test:  /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              message: ""
            },
          ]
        },
      },
    },
    onChange:(event:FormEvent<FormControl & HTMLInputElement>)=>this.handleChange(event),
    onPwChange:(event:FormEvent<FormControl & HTMLInputElement>)=>this.handlePwChange(event),
    formHasError: ()=>{
      const form = this.state.form;
      return form.email.hasError || form.username.hasError  || form.password.hasError ;
    },
  }
  constructor(props:any){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const regFormData = {...this.state.form};
    this.props.registerUser(parseInputToJSON(regFormData));
  }

  public handleChange(event:FormEvent<FormControl & HTMLInputElement>) {
    let updatedState: {[index:string]:any};
    const elementId = event.currentTarget.name;
    updatedState = { ...this.state.form};
    let updatedElement = updatedState[elementId];
    let hasError=false;
    let errorMsgs:string[]=[];
    if(updatedElement.elementConfig.required){
      updatedElement.validation.rules.map((rule:rule) =>{
        if(rule.test instanceof Function && !rule.test(event.currentTarget.value)) {
          hasError=true
          errorMsgs.push(rule.message);
        }
        if(rule.test instanceof RegExp && !rule.test.test(event.currentTarget.value)) {
          hasError=true;
          errorMsgs.push(rule.message);
        }
        return null;
      });
    }
    updatedElement = {...updatedElement, value: event.currentTarget.value, touched:true, hasError:hasError, errorMsg:errorMsgs};
    updatedState = {...updatedState, [elementId]:updatedElement};
    this.setState({form:updatedState});
  }

  public handlePwChange(event:FormEvent<FormControl & HTMLInputElement>) {
    let updatedState: {[index:string]:any}
    updatedState = { ...this.state.form};
    const elementId = event.currentTarget.name;
    const unchangedElId = elementId === 'password' ? 'confirmPassword' : 'password';
    let updatedPwElement = updatedState[elementId];
    let unchangedPwEl =  updatedState[unchangedElId];
    let hasError=false;
    let errorMsgs:string[]=[];
    [updatedPwElement, unchangedPwEl].map((el)=>{
        el.validation.rules.map((rule:rule) =>{
          if(rule.test instanceof Function && !rule.test(event.currentTarget.value)) {
            hasError=true
            errorMsgs.push(rule.message);
          }
          if(rule.test instanceof RegExp && !rule.test.test(event.currentTarget.value)) {
            hasError=true;
            errorMsgs.push(rule.message);
          }
          return null;
        })
        return null;
    })

    updatedPwElement = {...updatedPwElement, value: event.currentTarget.value, touched:true, hasError:hasError, errorMsg:errorMsgs};
    unchangedPwEl = {...unchangedPwEl, hasError:hasError};

    updatedPwElement.hasError= updatedPwElement.hasError ? true: updatedPwElement.value!==unchangedPwEl.value;
    unchangedPwEl.hasError= unchangedPwEl.hasError? true: updatedPwElement.value!==unchangedPwEl.value;

    updatedState = {...updatedState, [elementId]:updatedPwElement, [unchangedElId]:unchangedPwEl};
    this.setState({form:updatedState});
  }

  public render(){
    
    const formObj: {[index:string]:any}= { ...this.state.form};
    const formArray=[];
    for (let key in formObj){
      formArray.push({
        key:key,
        ...formObj[key]
      })
    }
    const psMatch = <div className="text-center text-danger">
                      {this.state.form.password.value === this.state.form.confirmPassword.value ? "": "Passwords do not match"}
                  </div>
    let form = <form name="registrationForm" onSubmit={this.handleSubmit}>
                <div className="row">
        { formArray.map((el)=>{
                if(el.elementConfig.type==='password')
                  return <Col key={el.key} className="justify-content-md-center col-6">
                            <FormInput elementType={el.elementType} onChange={this.state.onPwChange} hasError={el.hasError} errorMsg={el.errorMsg} touched={el.touched} elementConfig={el.elementConfig} value={el.value} label={el.label}/>
                          </Col>
                return <Col key={el.key} className="justify-content-md-center col-6">
                          <FormInput elementType={el.elementType} onChange={this.state.onChange} hasError={el.hasError} errorMsg={el.errorMsg} touched={el.touched} elementConfig={el.elementConfig} value={el.value} label={el.label}/>
                        </Col>
          })
        }
        </div>
        {psMatch}
        <div className="form-group text-center">
            <input type="submit" disabled={this.state.formHasError()} className="btn btn-dark btn-sm m-1" value="Register" />
          </div>
      </form>;

    return (
      <Container className="userRegistration">
        <div className="text-center">
          <h2>Register now</h2>
          <h5>to save your recipes and track your pantry</h5>
        </div>
        {form}
        <div className="text-info small text-center">
            After registering you will receive an email to activate your account. If you do not activate your account
            within 48 hours it will be deleted and you will need to register again.
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch:any) =>{
  return {
    registerUser: (loginData:any) => {

        dispatch({type: API, payload:{
          url:'/register',
          method:'POST',
          data:{...loginData},
          accessToken:'',
          onSuccess:registerSuccess,
          onFailure:registerFailed,
          label:null,
          headers:null
          }
        })
      },
  }
}

export default connect(null, mapDispatchToProps)(UserRegistration);