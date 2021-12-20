import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function RadioButtonsGroup(props) {
    const handleChange = (event) => {
        props.onChange(props.name, event.target.value);
    };

    return (
        <RadioGroup>
            {props.options && props.options.map(option =>
            (
                <FormControlLabel
                    key={option.value}
                    control={<Radio
                        color="primary"
                        checked={props.value === option.value}
                        onClick={handleChange}
                        value={option.value}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />}
                    label={option.label} />))}
        </RadioGroup>
    );
}