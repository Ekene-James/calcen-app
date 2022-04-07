import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';
import TextInput from '../textInput/TextInput';
import MenuBtn from '../menuBtn/MenuBtn';
import CustomTxt from '../customTxt/CustomTxt';
import StaticMenuBtn from '../menuBtn/StaticMenuBtn';
import { AdminContext } from '../../store/admin/AdminStore';
import { editAdminUser, handleSnackBar } from '../../store/admin/AdminAction';


const useStyles = makeStyles((theme) => ({

  btn: {
    
    [theme.breakpoints.down('sm')]: {
    margin:'10px 0px'
    },
  },

 

}));

export default function EditAdminUser({setinView}) {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const [menuTxt, setmenuTxt] = React.useState({
    engTxt:'Choose Role',
    japTxt:'権限を選択'  
  });
  const [state, setstate] = React.useState({
    first_name:adminCtx.state.editUser.first_name,
    last_name:adminCtx.state.editUser.last_name,
    email:adminCtx.state.editUser.email,
    id:adminCtx.state.editUser.id,
    password:'',
    confirmPassword:'',
  });
  const listArr =[
    {
        engTxt:'Manager',
        japTxt:'管理者'  
    },
    {
        engTxt:'Editor',
        japTxt:'編集者'  
    },
    {
        engTxt:'Viewer',
        japTxt:'閲覧者'  
    },
 ]
  React.useEffect(() => {
  
    if(adminCtx.state.editUser.role.toLowerCase() === 'manager'){
        setmenuTxt(listArr[0])
    }else if(adminCtx.state.editUser.role.toLowerCase() === 'editor'){
        setmenuTxt(listArr[1])
    }else{
        setmenuTxt(listArr[2])
    }
  },[])
  
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  const handleEdit = () => {
    if(state.password && (state.password !== state.confirmPassword)){
        adminCtx.dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg: authCtx.state.isEnglish ?  'Password and Confirm password must be same' : 'パスワードとパスワードの確認は同じである必要があります'
        }))
          return;
      }
      
      const data ={
          ...state,
          user_role:menuTxt.engTxt
      }
      adminCtx.dispatch(editAdminUser(data,adminCtx.dispatch))
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
            shrink={true}
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

        <Grid item xs={12}>
            <Grid item xs={12} md={6}>
            <TextInput
                value={state.email}
                name='email'
                handleChange={handleChange}  
                engLabel='Email'
                jLabel='メールアドレス'
            
            />
            </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextInput
          value={state.password}
          name='password'
          handleChange={handleChange}  
          type='password'
          engLabel='Initial password'
          jLabel='初期パスワード'
          engHelperTxt='6-20 Characters. Admin User can change the password later'
          jHelperTxt='6〜20文字。管理者ユーザーは後でパスワードを変更できます'
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
       
        <Grid item xs={12}>
          <Grid item xs={12} md={4}>
          <CustomTxt engTxt={'Role'} japTxt={'権限'} type='h5'style={{margin:0,padding:0}}/>
             <StaticMenuBtn setmenuTxt={setmenuTxt} menuTxt={menuTxt} listArr={listArr} color='white' background='grey'/>
          </Grid>
        </Grid>


        <Grid item sm={6} md={2}>
          <Button variant="contained" color="primary" disabled={adminCtx.state.loadings.isLoading} onClick={handleEdit}>
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
