import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, FormLabel, FormGroup } from 'react-bootstrap';

interface option{
  key: string,
  value: string,
  name: string,
  id: string
}
const FormSelect:React.FC = (props: any) => {
  let requiredIcon =  null;
    if (props.required)
        requiredIcon = <FontAwesomeIcon className="small pr-1" icon="star-of-life"></FontAwesomeIcon>;
    return (
      <FormGroup controlId={props.name}>
                <FormLabel>
                    {requiredIcon}
                    {props.label}
                </FormLabel>
        <FormControl as="select" name={props.name} id={props.name} className="{props.className} form-control">
          <option value="" />
          {props.options.map((option: option) => (
            <option key={option.key} value={option.value}>
              {option.value}
            </option>
          ))}
        </FormControl>
      </FormGroup>
    );
  }

  export default FormSelect;