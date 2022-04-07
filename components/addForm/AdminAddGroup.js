import React from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';
import TextInput from '../textInput/TextInput';
import MenuBtn from '../menuBtn/MenuBtn';
import CustomTxt from '../customTxt/CustomTxt';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { addAdmin ,handleSnackBar} from '../../store/superAdmin/SuperAdminAction';


const useStyles = makeStyles((theme) => ({

  btn: {
    
    [theme.breakpoints.down('sm')]: {
    margin:'10px 0px'
    },
  },

 

}));

export default function AdminAddGroup({setinView}) {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [menuTxt, setmenuTxt] = React.useState({
    plan_name:'Choose Plan',
    japTxt:'プランを選択' ,
    id:0 
  });
  const [state, setstate] = React.useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    confirm_password:'',
   
    external_number:sAdminCtx.state.extNum,
    group_id:sAdminCtx.state.uniqueId,
    group_name:'',
    group_email:'',
    subdomain:'',
   
  });
  
  
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const handleAdd = () => {
    if(state.password !== state.confirm_password){
      sAdminCtx.dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg: authCtx.state.isEnglish ?  'Password and Confirm password must be same' : 'パスワードとパスワードの確認は同じである必要があります'
      }))
        return;
    }
    const data={
      ...state,
      plan_id:menuTxt.id
    }
    sAdminCtx.dispatch(addAdmin(data,sAdminCtx.dispatch))
  
    // setmenuTxt({
    // plan_name:'Choose Plan',
    // japTxt:'プランを選択' ,
    // id:0 
    // })
  }

  return (
  
    <Grid style={{padding:'10px'}}  container spacing={3}  justifyContent="space-between"  alignItems="flex-start">
   
    <Grid container spacing={4} item xs={12} md={5}>
        <Grid item xs={12} md={10}>
        <TextInput
          value={state.group_name}
          name='group_name'
          handleChange={handleChange}  
          engLabel='Group Name'
          jLabel='グループ名'
          shrink={true}
        />
      </Grid>
      <Grid item xs={11}>
        <TextInput
          value={state.subdomain}
          name='subdomain'
          handleChange={handleChange}  
          engLabel='Group subdomain'
          jLabel='サブドメイン'
          engHelperTxt={`This subdomain will be used for group's portal URL`}
          jHelperTxt='各グループのWeb管理画面用URLで使用するサブドメインです。'
         
        />
      </Grid>


          <Grid item xs={9} >
          <TextInput
              value={state.group_email}
              name='group_email'
              handleChange={handleChange}  
              engLabel='Group Email address'
              jLabel='代表メールアドレス'
          
          />
          </Grid>
   
          <Grid item xs={11}>
          <TextInput
            value={state.group_id}
            name='group_id'
            handleChange={handleChange}  
            engLabel='Group ID'
            jLabel='グループID'
            engHelperTxt={`This is unique ID for Group which is assigned automatically by system. Group need this ID and password to login operator mobile`}
            jHelperTxt='これは、システムによって自動的に割り当てられるグループの一意のIDです。グループは、オペレーターモバイルにログインするためにこのIDとパスワードが必要です'
            disabled={true}
          />
        </Grid>
          <Grid item xs={10}>
          <TextInput
            value={state.external_number}
            name='external_number'
            handleChange={handleChange}  
            engLabel='Main External number'
            jLabel='代表外線番号'
            engHelperTxt={`This is unique external number for group. This is given by system automatically and can not change`}
            jHelperTxt='この外線番号はシステムから自動割り当てとなり変更できません。'
            disabled={true}
           
          />
        </Grid>
  
       
      <Grid item xs={12}>
        <Grid item xs={12} md={4}>
        <CustomTxt engTxt={'Plan'} japTxt={'プラン'} type='h5'style={{margin:0,padding:0}}/>
           <MenuBtn setmenuTxt={setmenuTxt} menuTxt={menuTxt} listArr={authCtx.state.user.plan} color='white' background='grey'/>
        </Grid>
      </Grid>


      <Grid item sm={6} md={2}>
        <Button disabled={sAdminCtx.state.isAddAdminLoading ? true :false} onClick={handleAdd} variant="contained" color="primary">
          {authCtx.state.isEnglish ?  'Add' : '追加'}
        </Button>
      </Grid>
      <Grid item sm={6} md={2}>
        <Button variant="contained" color="secondary" onClick={() => setinView('default')}>
          {authCtx.state.isEnglish ?  'Cancel' : 'キャンセル'}
        </Button>
      </Grid>
      </Grid>
    

     
        <Grid container 
        spacing={1} 
        style={{
          height:'60%'
        }}
        justifyContent="flex-start"
        alignItems="flex-start"
         item xs={12} md={5}>
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
        <Grid item xs={10} >
          <TextInput
            value={state.email}
            name='email'
            handleChange={handleChange}  
            engLabel='Email address'
            jLabel='苗字'
          />
        </Grid>
      
        
        <Grid item xs={12} >
          <TextInput
            value={state.password}
            name='password'
            handleChange={handleChange}  
            type='password'
            engLabel='Initial password for group admin user'
            jLabel='グループ管理者ユーザーの初期パスワード'
            engHelperTxt='6-20 Characters. Admin User can change the password later'
            jHelperTxt='6〜20文字。管理者ユーザーは後でパスワードを変更できます'
          />
        </Grid>
        <Grid item xs={12} >
          <TextInput
            value={state.confirm_password}
            name='confirm_password'
            handleChange={handleChange}  
            type='password'
            engLabel='Confirm password'
            jLabel='パスワード確認'
          />
        </Grid>
        </Grid>
       
        
    </Grid>

  );
}
