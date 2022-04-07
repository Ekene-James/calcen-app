import React from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';

import TextInput from '../textInput/TextInput';
import { addAdminPlan, postEditAdminPlan } from '../../store/superAdmin/SuperAdminAction';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';

export default function EditAdminPlanSettings({setinView}) {
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [state, setstate] = React.useState({
    plan_name:sAdminCtx?.state?.singleAdminPlan?.plan_name,
    plan_price:sAdminCtx?.state?.singleAdminPlan?.plan_price,
    status:sAdminCtx?.state?.singleAdminPlan?.status,
    max_user:sAdminCtx?.state?.singleAdminPlan?.max_user,
    max_operator:sAdminCtx?.state?.singleAdminPlan?.max_operator,
    id:sAdminCtx?.state?.singleAdminPlan?.id
   
  });
  const handleEdit = () => {
 
    sAdminCtx.dispatch(postEditAdminPlan(state,sAdminCtx.dispatch))

  }
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  return (
    <Paper style={{padding:'50px'}} elevation={3} >
    <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.plan_name}
            name='plan_name'
            handleChange={handleChange}  
            engLabel='Name'
            jLabel='名前'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.plan_price}
            name='plan_price'
            handleChange={handleChange}  
            engLabel='Price'
            jLabel='金額'
          />
        </Grid>
       
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.max_user}
            name='max_user'
            handleChange={handleChange}  
            engLabel='Max. Number of users'
            jLabel='ユーザ数'
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.max_operator}
            name='max_operator'
            handleChange={handleChange}  
            engLabel='Max. Number of Operators'
            jLabel='コンシェルジュ数'
            
          />
        </Grid>
    
        
        <Grid item sm={6} md={2}>
          <Button variant="contained" disabled={sAdminCtx.state.loading ? true :false} onClick={handleEdit} color="primary">
            {authCtx.state.isEnglish ?  'Edit' : '編集'}
          </Button>
        </Grid>
        <Grid item sm={6} md={2}>
          <Button variant="contained" color="secondary" onClick={() => setinView('default')}>
            {authCtx.state.isEnglish ?  'Cancel' : 'キャンセル'}
          </Button>
        </Grid>
    </Grid>

    </Paper>
  );
}
