import React from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';

import TextInput from '../textInput/TextInput';
import { AdminContext } from '../../store/admin/AdminStore';
import { addOperator, editOperator, handleSnackBar } from '../../store/admin/AdminAction';

export default function EditOperator({setinView}) {
  const authCtx = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const [state, setstate] = React.useState({
    first_name:adminCtx.state.editUser.first_name,
    last_name:adminCtx.state.editUser.last_name,
    display_name:adminCtx.state.editUser.display_name,
     email:adminCtx.state.editUser.email,
    // operator_unique_id:adminCtx.state.editUser.unique_id,
    // external_number:adminCtx.state.editUser.external_number,
    password:'',
    confirmPassword:'',
    id:adminCtx.state.editUser.id,
  });
  
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const handleAdd = () => {
    if(state.password && (state.password !== state.confirmPassword)){
      adminCtx.dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg: authCtx.state.isEnglish ?  'Password and Confirm password must be same' : 'パスワードとパスワードの確認は同じである必要があります'
      }))
        return;
    }
    adminCtx.dispatch(editOperator(state,adminCtx.dispatch))
  }

  return (
    <Paper style={{padding:'50px'}} elevation={3} >
    <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.first_name}
            name='first_name'
            handleChange={handleChange}  
            engLabel='First Name'
            jLabel='名'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.last_name}
            name='last_name'
            handleChange={handleChange}  
            engLabel='Last Name'
            jLabel='氏'
          />
        </Grid>
       
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.display_name}
            name='display_name'
            handleChange={handleChange}  
            engLabel='Display Name'
            jLabel='表示名'
            engHelperTxt='This name will be shown when incoming call'
            jHelperTxt='この名前が着信画面に表示されます。'
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextInput
          value={state.email}
          name='email'
          handleChange={handleChange}  
          engLabel='Email'
          jLabel='部屋番号'
          disabled={true}
          
        />
      </Grid>
     
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.password}
            name='password'
            handleChange={handleChange}  
            type='password'
            engLabel='Initial password'
            jLabel='初期パスワード'
            engHelperTxt='6-20 Characters. User can change the password later'
            jHelperTxt='6-20 文字。このパスワードはユーザに配布する初期パスワードです。このパスワードはユーザが自由に変更できます。'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.confirmPassword}
            name='confirmPassword'
            handleChange={handleChange}  
            type='password'
            engLabel='Confirm password'
            jLabel='パスワード確認'
          />
        </Grid>
        <Grid item sm={6} md={2}>
          <Button disabled={adminCtx.state.loadings.isLoading} variant="contained" color="primary" onClick={handleAdd}>
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
