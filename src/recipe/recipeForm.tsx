import React, { FormEvent,MouseEvent } from 'react';
import FormInput from '../forms/formInput';
import {API, registerFailed, registerSuccess}  from '../store/actions';
import { FormControl, Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { parseInputToJSON, parseIngredientToJSON } from '../tools/jsonParsers';

interface Props {
  saveRecipe: (recipeFormData:any)=>void;
}
interface rule{
  test: any,
  message: string
}
interface ingredient{
    ingredientName: string,
    ingredientAmount: string,
    elementConfig: {
      type: 'text',
      placeholder: 'Ingredient Name',
      required:false,
    },
  value:'',
  label:'Ingredient ',
}
class RecipeForm extends React.Component<Props,{}>  {

  state = {
    form:{
      recipeName:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          name:'recipeName',
          required:true,
        },
        hasError:true,
        errorMsg:[],
        validation:{
          rules:[
            {
              test: /^[a-zA-Z0-9-_ ]+$/,
              message: "You need a recipe name",
            }
          ]
        },
        value:'',
        label:'Recipe Name',
        touched: false,
      },
      description:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Description',
          name:'description',
          required:false,
        },
        value:'',
        label:'Description',
        touched: false,
      },
      instructions:{
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'Step 1)...',
          name:'instructions',
          required:false,
        },
        value:'',
        label:'Instructions/Steps',
        touched: false,
        hasError:true,
        errorMsg:[],
        validation:{
          rules:[
            {
              test: /^[a-zA-Z0-9-_]+$/,
              message: "You can't make an omlette if you don't crack some eggs",
            }
          ]
        },
      },
    },
    ingredientList: [{
      ingredientName: "",
      ingredientAmount: "",
      elementConfig: {
        type: 'text',
        placeholder: 'Ingredient Name',
        required:false,
      },
      value:'',
      label:'',
    }],
    onChange:(event:FormEvent<FormControl & HTMLInputElement>)=>this.handleChange(event),
    addIngredient:(event:MouseEvent<MouseEvent & HTMLInputElement>)=>this.addIngredient(event),
    deleteIngredient:(event:MouseEvent<MouseEvent & HTMLInputElement>, index: number)=>this.deleteIngredient(event, index),
    updateIngredient:(event:FormEvent<FormControl & HTMLInputElement>, index: number)=>this.updateIngredient(event, index),
    formHasError: ()=>{
      return this.state.form.recipeName.hasError || this.state.ingredientList.length==0;
    },
  }
  constructor(props:any){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const {form, ingredientList}: {[index:string]:any}= { ...this.state};
    const recipeFormData = {...parseInputToJSON(form), ingredientList:parseIngredientToJSON(ingredientList)};
    this.props.saveRecipe(recipeFormData);
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

  public updateIngredient(event:FormEvent<FormControl & HTMLInputElement>, index: number) {
    let updatedState: {[index:string]:any};
    updatedState = { ...this.state};
    const ingredientList = updatedState.ingredientList;
    let updatedElement = ingredientList[index];
    updatedElement = {...updatedElement, [event.currentTarget.name]: event.currentTarget.value};
    ingredientList[index] = updatedElement;
    this.setState({ingredientList:ingredientList});
  }

  public addIngredient(event:MouseEvent<MouseEvent & HTMLInputElement>) {
    let updatedState: {[index:string]:any};
    updatedState = { ...this.state};
    let ingredientList = updatedState['ingredientList'];

    ingredientList.push({
      ingredientName: "",
      ingredientAmount: "",
      elementConfig: {
        type: 'text',
        required:false,
      },
    value:'',
    label:'',
  })
  
    this.setState({ingredientList:ingredientList});
  }

  public deleteIngredient(event:MouseEvent<MouseEvent & HTMLInputElement>, index:number) {
    let updatedState: {[index:string]:any};
    updatedState = { ...this.state};
    let ingredientList = updatedState['ingredientList'];
    ingredientList.splice(index, 1);
    if(ingredientList.length==0)
      this.addIngredient(event);
    this.setState({ingredientList:ingredientList});
  }

  public render(){
    
    const {form, ingredientList}: {[index:string]:any}= { ...this.state};
    const formArray=[];
    for (let key in form){
      formArray.push({
        key:key,
        ...form[key]
      })
    }
    let ingrientsElement =   <Row>
        { ingredientList.map((item:ingredient, index:number)=>{
            return <Col key={index} className="justify-content-md-center col-6 mt-2">
            <FormInput elementType="input"
                        onChange={(event:FormEvent<FormControl & HTMLInputElement>)=>this.state.updateIngredient(event, index)}
                        elementConfig={{...item.elementConfig, name:"ingredientName", placeholder: 'Ingredient Name'}}
                        value={item.ingredientName}
                        label={item.label}
                        />
            <FormInput elementType="input"
                        onChange={(event:FormEvent<FormControl & HTMLInputElement>)=>this.state.updateIngredient(event, index)}
                        elementConfig={{...item.elementConfig, name:"ingredientAmount", placeholder: 'Quantity'}}
                        value={item.ingredientAmount}
                        label=''
                        />
            <input type="button"  className="btn btn-dark btn-sm m-1" onClick={(event:MouseEvent<MouseEvent & HTMLInputElement>)=>this.state.deleteIngredient(event, index)} value="Delete Ingredient" />
          </Col>
        })
        }
        </Row>;

    let formElement = <form name="registrationForm" onSubmit={this.handleSubmit}>
                <div className="row">
        { formArray.map((el)=>{
          if( el.key == 'instructions' || el.key == 'description' )
            return <Row key={el.key} className="col-12">
                    <Col className="justify-content-md-center col-11">
                      <FormInput elementType={el.elementType} onChange={this.state.onChange} hasError={el.hasError} errorMsg={el.errorMsg} touched={el.touched} elementConfig={el.elementConfig} value={el.value} label={el.label}/>
                    </Col>
                    </Row>
          else
            return <Col key={el.key} className="justify-content-md-center col-7">
                      <FormInput elementType={el.elementType} onChange={this.state.onChange} hasError={el.hasError} errorMsg={el.errorMsg} touched={el.touched} elementConfig={el.elementConfig} value={el.value} label={el.label}/>
                    </Col>
     
          })
        }
        </div>
        <Row className="col-12">Ingredients</Row>
        {ingrientsElement}
        <div className="form-group text-center mt-2">
          <input type="button"  className="btn btn-dark btn-sm m-1" onClick={this.state.addIngredient} value="Add Ingredient" />
          <input type="submit" disabled={this.state.formHasError()} className="btn btn-dark btn-sm m-1" value="Save Recipe" />
        </div>
      </form>;

    return (
      <Container className="userRegistration">
        <div className="text-center">
          <h2>New Recipe</h2>
        </div>
        {formElement}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch:any) =>{
  return {
    saveRecipe: (recipeData:any) => {

        dispatch({type: API, payload:{
          url:'/addRecipe',
          method:'POST',
          data:{...recipeData},
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

export default connect(null, mapDispatchToProps)(RecipeForm);