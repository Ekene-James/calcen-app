import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';
import TextInput from '../textInput/TextInput';
import MenuBtn from '../menuBtn/MenuBtn';
import CustomTxt from '../customTxt/CustomTxt';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { addAdmin ,editSingleAdminGroup,handleSnackBar} from '../../store/superAdmin/SuperAdminAction';


const useStyles = makeStyles((theme) => ({

  btn: {
    
    [theme.breakpoints.down('sm')]: {
    margin:'10px 0px'
    },
  },

 

}));

export default function EditAdminGroup({setinView}) {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [menuTxt, setmenuTxt] = React.useState({
    plan_name:'Choose Plan',
    japTxt:'プランを選択' ,
    id:0 
  });
  const [state, setstate] = React.useState({
    first_name:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.first_name || '',
    last_name:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.last_name || '',
    email:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.email || '',
    password:'',
    confirm_password:'',
    group_email:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.group_email || '',
    external_number:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.external_number || '',
    group_id:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.group_id || '',
    group_name:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.group_name || '',
    subdomain:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.subdomain || '',
   
  });
    useEffect(() => {
        const plan = authCtx.state.user.plan.filter(plan => plan.id == sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.plan_id)
        if(plan.length > 0){
            setmenuTxt(plan[0])
        }
    },[])
  
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const handleAdd = () => {
    if(state.password && (state.password !== state.confirm_password)){
      sAdminCtx.dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg: authCtx.state.isEnglish ?  'Password and Confirm password must be same' : 'パスワードとパスワードの確認は同じである必要があります'
      }))
        return;
    }
    const data={
      ...state,
      plan_id:menuTxt.id,
      id:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.id
    }
    sAdminCtx.dispatch(editSingleAdminGroup(data,sAdminCtx.dispatch))
  
  }

  return (
  
    <Grid style={{padding:'50px'}} container spacing={3}>
   
    <Grid container spacing={4} item xs={12} md={6}>
        <Grid item xs={12} md={10}>
        <TextInput
          value={state.group_name}
          name='group_name'
          handleChange={handleChange}  
          engLabel='Group Name'
          jLabel='Group Name'
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
              engLabel='Group Email'
              jLabel='メールアドレス'
          
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
        <Button disabled={sAdminCtx.state.loading ? true :false} onClick={handleAdd} variant="contained" color="primary">
          {authCtx.state.isEnglish ?  'Edit' : '編集'}
        </Button>
      </Grid>
      <Grid item sm={6} md={2}>
        <Button variant="contained" color="secondary" onClick={() => setinView('details')}>
          {authCtx.state.isEnglish ?  'Cancel' : 'キャンセル'}
        </Button>
      </Grid>
      </Grid>
    

     
        <Grid container spacing={1} alignItems="flex-start" justifyContent="flex-end" item xs={12} md={6}>
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
