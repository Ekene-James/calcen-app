import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomTxt from '../customTxt/CustomTxt';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({label,name,arr,jLabel}) {
  const classes = useStyles();
  const [state, setstate] = React.useState('');

  const handleChange = (event) => {
    setstate(event.target.value);
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
      <CustomTxt engTxt={label} japTxt={jLabel} color='#174A84' type='h5'/>
      
      
        <Select
          labelId={`simple-select-${name}`}
          id={`select-${name}`}
          value={state}
          onChange={handleChange}
        >{
            arr.map((item,i) =>  <MenuItem key={i} value={10}>{item}</MenuItem>)
        }
         
         
        </Select>
      </FormControl>


    </>
  );
}
