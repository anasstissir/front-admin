import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Switches(props) {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    props.onChange(props.name, !props.value)
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={props.value}
            onClick={handleChange}
            name={'checkedA'}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            label={props.label}
          />}
        label={props.label}
      />

    </div>
  );
}
