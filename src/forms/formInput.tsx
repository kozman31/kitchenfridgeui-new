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
    if (props.required)
        requiredIcon = <FontAwesomeIcon className="small pr-1" icon="star-of-life"></FontAwesomeIcon>;

    switch (props.elementType){
        case 'input': {
            inputElemant = <FormControl
                                name={props.name}
                                id={props.name}
                                type={props.type}
                                value={props.value}
                                className="form-control {classes.InputElement}"
                                onChange={props.onChange}
                                placeholder={props.placeholder}
                                children={props.children}
                                onError={props.error}
                            />
            break;
        }
        case 'textArea': {
            inputElemant = <FormControl
                                name={props.name}
                                as={props.elementType}
                                id={props.id}
                                value={props.value}
                                className="form-control {props.className}"
                                onChange={props.onChange}
                                placeholder={props.placeholder}
                                children={props.children}
                                onError={props.error}
                            />
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
        }
        default: {
            inputElemant = <FormControl className="form-control {classes.inputElemant}" {...props.elementConfig} value={props.value}/>
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