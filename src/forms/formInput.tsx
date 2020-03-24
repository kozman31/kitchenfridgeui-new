import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.scss';
import { FormControl, FormLabel, FormGroup } from 'react-bootstrap';

interface option{
    key: string,
    value: string,
    name: string,
    id: string
  }

  interface rule{
    test: any,
    message: string
  }
  
const FormInput: React.FC<any> = (props: any) =>{
    let inputElemant = null;
    let requiredIcon =  null;
    let label = null;

    const isRequired = props.elementConfig.required;
    const classes= [''];
    let errorMsg = [''];

    if (isRequired){
        requiredIcon = <FontAwesomeIcon className="small pr-1" icon="star-of-life"></FontAwesomeIcon>;

        if(!props.hasError && props.touched){
            classes.push('validTouched');
        } else {
        if(props.touched){
                classes.push('invalidTouched');
                errorMsg = props.errorMsg;
            }
            else
                classes.push('invalid'); 
        }
    }
    
    switch (props.elementType){
        case 'input': {
            inputElemant = <FormControl className={classes.join(' ')} {...props.elementConfig} onChange={props.onChange} value={props.value}/>
            break;
        }
        case 'textarea': {
            inputElemant = <FormControl className={classes.join(' ')} as={props.elementType} {...props.elementConfig} required={isRequired} onChange={props.onChange} value={props.value}/>
            break;
        }
        case 'select': {
            inputElemant = <FormControl as={props.elementType} name={props.name} id={props.name} required={isRequired} className={classes.join(' ')}>
                                <option value="" />
                                    {props.options.map((option: option) => (
                                        <option key={option.key} value={option.value}>
                                        {option.value}
                                        </option>
                                    ))}
                                </FormControl>
            break;
        }
        default: {
            inputElemant = <FormControl className={classes.join(' ')} {...props.elementConfig} onChange={props.onChange} value={props.value}/>
            break;
        }
    }

    if (props.label !=""){
        label = <FormLabel>
                    {requiredIcon}
                    {props.label}
                </FormLabel>
    }
    return (  
        <FormGroup controlId={props.name}>
            {label}
            {inputElemant}
            {  errorMsg.map((msg, index)=>{
                return <div key={index} className="text-danger">{msg}</div>
                })
            }
        </FormGroup>
    )
};

export default FormInput;