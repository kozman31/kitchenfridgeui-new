import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.css';
import { FormControl, FormLabel, FormGroup } from 'react-bootstrap';

interface option{
    key: string,
    value: string,
    name: string,
    id: string
  }
  
const FormInput: React.FC<any> = (props: any) =>{
    let inputElemant = null;
    let requiredIcon =  null;
    if (props.elementConfig.required)
        requiredIcon = <FontAwesomeIcon className="small pr-1" icon="star-of-life"></FontAwesomeIcon>;

    switch (props.elementType){
        case 'input': {
            inputElemant = <FormControl className="form-control {classes.inputElemant}" {...props.elementConfig} onChange={props.onChange} value={props.value}/>
            break;
        }
        case 'textArea': {
            inputElemant = <FormControl className="form-control {classes.inputElemant}" as={props.elementType} {...props.elementConfig} onChange={props.onChange} value={props.value}/>
            break;
        }
        case 'select': {
            inputElemant = <FormControl as={props.elementType} name={props.name} id={props.name} className="{props.className} form-control">
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
            inputElemant = <FormControl className="form-control {classes.inputElemant}" {...props.elementConfig} onChange={props.onChange} value={props.value}/>
            break;
        }
    }
    return (  
        <FormGroup controlId={props.name}>
                <FormLabel>
                    {requiredIcon}
                    {props.label}
                </FormLabel>
                {inputElemant}
        </FormGroup>
    )
};

export default FormInput;