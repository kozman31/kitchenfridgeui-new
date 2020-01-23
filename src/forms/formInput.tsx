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

    const required = props.validation.required;
    const classes= [''];
    let errorMsg = '';
    if (required){
        requiredIcon = <FontAwesomeIcon className="small pr-1" icon="star-of-life"></FontAwesomeIcon>;

        props.validation.rules.map((rule:rule) =>{
            if(rule.test instanceof Function) {
                if(rule.test(props.value) && props.touched){
                    classes.push('validTouched');
                } else 
                if(props.touched){
                        classes.push('invalidTouched');
                        errorMsg = rule.message;
                    }
                    else
                        classes.push('invalid'); 
            }
            if(rule.test instanceof RegExp) {
                if(rule.test.test(props.value) && props.touched){
                    classes.push('validTouched');
                } else 
                    if(props.touched){
                        classes.push('invalidTouched');
                        errorMsg = rule.message;
                    }
                    else
                        classes.push('invalid');
            }
            return null;
        })
    }

    switch (props.elementType){
        case 'input': {
            inputElemant = <FormControl className={classes.join(' ')} {...props.elementConfig} required={props.validation.required} onChange={props.onChange} value={props.value}/>
            break;
        }
        case 'textArea': {
            inputElemant = <FormControl className={classes.join(' ')} as={props.elementType} {...props.elementConfig} onChange={props.onChange} value={props.value}/>
            break;
        }
        case 'select': {
            inputElemant = <FormControl as={props.elementType} name={props.name} id={props.name} className={classes.join(' ')}>
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
    return (  
        <FormGroup controlId={props.name}>
                <FormLabel>
                    {requiredIcon}
                    {props.label}
                </FormLabel>
                {inputElemant}
                <div className="text-danger">{errorMsg}</div>
        </FormGroup>
    )
};

export default FormInput;