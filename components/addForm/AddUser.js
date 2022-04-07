import React from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';

import TextInput from '../textInput/TextInput';
import { addUser, handleSnackBar } from '../../store/admin/AdminAction';
import { AdminContext } from '../../store/admin/AdminStore';

export default function AddUser({setinView}) {
  const authCtx = React.useContext(AuthContext);
    const adminCtx = React.useContext(AdminContext);
  const [state, setstate] = React.useState({
    first_name:'',
    last_name:'',
    room_number:'',
    display_name:'',
    email:'',
    user_unique_id:adminCtx.state.uniqueNumbers.uniqueId,
   
    password:'',
    confirmPassword:'',
    extension_number:adminCtx.state.uniqueNumbers.externalNum
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
    adminCtx.dispatch(addUser(state,adminCtx.dispatch))
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
            value={state.room_number}
            name='room_number'
            handleChange={handleChange}  
            engLabel='Room Number'
            jLabel='部屋番号'
            engHelperTxt={`User's Room Number`}
            jHelperTxt='ユーザーの部屋番号'
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
            value={state.display_name}
            name='display_name'
            handleChange={handleChange}  
            engLabel='Display Name'
            jLabel='表示名'
            engHelperTxt='This name will be shown when incoming call'
            jHelperTxt='この名前が着信画面に表示されます。'
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextInput
            value={state.user_unique_id}
            name='user_unique_id'
            handleChange={handleChange}  
            readOnly={true}
            engLabel='User ID'
            jLabel='ユーザID'
            engHelperTxt='This is unique id for user which is assigned automatically by system. User need this ID and password to login user mobile app.'
            jHelperTxt='ユーザに割り当てられるユニークIDです。ユーザアプリへのログインにはこのIDとパスワードが必要になります。'
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextInput
            value={state.extension_number}
            name='extension_number'
            handleChange={handleChange}  
            readOnly={true}
            engLabel='Extension Number'
            jLabel='内線番号'
            engHelperTxt='This is unique extension number for user. This is given by system automatically and can not change.'
            jHelperTxt='これは、ユーザーの一意の内線番号です。これはシステムによって自動的に与えられ、変更することはできません。'
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
