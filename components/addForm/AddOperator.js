import React from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';

import TextInput from '../textInput/TextInput';
import { AdminContext } from '../../store/admin/AdminStore';
import { addOperator, handleSnackBar } from '../../store/admin/AdminAction';

export default function AddOperator({setinView}) {
  const authCtx = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const [state, setstate] = React.useState({
    first_name:'',
    last_name:'',
    display_name:'',
    email:'',
    operator_unique_id:adminCtx.state.uniqueNumbers.uniqueId,
    password:'',
    confirmPassword:'',
    external_number:adminCtx.state.uniqueNumbers.externalNum,
  });
  
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const handleAdd = () => {
    if(!state.password || (state.password !== state.confirmPassword)){
      adminCtx.dispatch(handleSnackBar({
        type:'error',
        open:true,
     
        msg: authCtx.state.isEnglish ?  'Password and Confirm password must be same' : 'パスワードとパスワードの確認は同じである必要があります'
      }))
        return;
    }
    adminCtx.dispatch(addOperator(state,adminCtx.dispatch))
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
          
        />
      </Grid>
        <Grid item xs={12} md={8}>
          <TextInput
            value={state.operator_unique_id}
            name='operator_unique_id'
            handleChange={handleChange}  
            readOnly={true}
            engLabel='Operator ID'
            jLabel='コンシェルジュID'
            engHelperTxt='This is unique id for operator which is assigned automatically by system. Operator need this ID and password to login operator.'
            jHelperTxt='コンシェルジュに割り当てられるユニークIDです。コンシェルジュアプリへのログインにはこのIDとパスワードが必要になります。'
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextInput
            value={state.external_number}
            name='external_number'
            handleChange={handleChange}  
            readOnly={true}
            engLabel='External Number'
            jLabel='内線番号'
            engHelperTxt='This is unique external number for operator. This is given by system automatically and can not change.'
            jHelperTxt='コンシェルジュに割り当てられる外線番号です。自動割り当てとなり変更はできません。'
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
            {authCtx.state.isEnglish ?  'Add' : '追加'}
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
