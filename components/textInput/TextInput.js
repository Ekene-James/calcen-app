import React from 'react';

import {  makeStyles, withStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../store/auth/AuthStore';
import TextField from '@material-ui/core/TextField';

export default function TextInput({style={},engLabel,jLabel,name,type='text',handleChange,disabled=false,shrink=true,value='',engHelperTxt,jHelperTxt,readOnly=false}) {
  const authCtx = React.useContext(AuthContext);
 
   

  return (
   <div style={{width:'100%'}}>
    <h5>{authCtx.state.isEnglish ? engLabel: jLabel}</h5>
    <TextField 
        disabled={disabled} 
        value={value}
        name={name} 
        onChange={handleChange}  
        
        variant="outlined" 
        type={type}
        style={{...style}}
        InputProps={{
            readOnly: readOnly,
          }}
     
        fullWidth
        helperText={authCtx.state.isEnglish ? engHelperTxt: jHelperTxt}
    />
   </div>
  );
}
