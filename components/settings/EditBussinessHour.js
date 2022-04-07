import React from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';

import TextInput from '../textInput/TextInput';
import MenuBtn from '../menuBtn/MenuBtn';
import CustomTxt from '../customTxt/CustomTxt';
import SettingsCheckBox from './SettingsCheckBox';
import StaticMenuBtn from '../menuBtn/StaticMenuBtn';
import { AdminContext } from '../../store/admin/AdminStore';
import { addSettings, editSettings, handleSnackBar } from '../../store/admin/AdminAction';

const useStyles = makeStyles((theme) => ({

  btn: {
    
    [theme.breakpoints.down('sm')]: {
    margin:'10px 0px'
    },
  },

 

}));

const listArr =[
    {
        engTxt:'Operator Response',
        japTxt:'コンシェルジュ応答'  
    },
    {
        engTxt:'answering machine (with voice message)',
        japTxt:'自動応答（留守番電話あり）'  
    },
    {
        engTxt:'answering machine (without voice message)',
        japTxt:'自動応答（留守番電話なし）'  
    },
 ]

export default function EditBussinessHour({setinView}) {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const [answering_file, setansweringfile] = React.useState('');

  const [day, setday] = React.useState({
    mon:false,
    tue:false,
    wed:false,
    thu:false,
    fri:false,
    sat:false,
    sun:false,
   });

 
 
   const handleChangeDay = (event) => {
    setday({ ...day, [event.target.name]: event.target.checked });
   };

  const [menuTxt, setmenuTxt] = React.useState({
    engTxt:'Choose Process',
    japTxt:'設定内容を選択'  
  });
  const [state, setstate] = React.useState({
    setting_name:adminCtx?.state?.singleSettingItem?.setting_name,
    start_time:adminCtx?.state?.singleSettingItem?.start_time,
    end_time:adminCtx?.state?.singleSettingItem?.end_time,
    start_day:adminCtx?.state?.singleSettingItem?.start_day,
    end_day:adminCtx?.state?.singleSettingItem?.end_day,
 

   
  });
  
  React.useLayoutEffect(() => {
    const list =listArr.filter(list => list.engTxt === adminCtx?.state?.singleSettingItem?.process)
    if(list[0]){
        setmenuTxt(list[0])
    }

   }, [])
  React.useLayoutEffect(() => {
  const days = adminCtx?.state?.singleSettingItem?.days.split(',')
  let daysObj={}
  days.forEach(d => daysObj[d] = true)

  setday({ ...day,...daysObj});
  
   }, [])

  const handleFileUpload = (e) => {
    setansweringfile(e.target.files[0])
  }
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = (e) => {
    if(menuTxt.engTxt === 'Choose Role'){
      adminCtx.dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg: authCtx.state.isEnglish ?  'Please select a role' : '役割を選択してください'
      }))
        return;
    }
    let data=[]
 for (const key in day) {
    if(day[key]){
    data.push(key)
    }
 }
 
 
 const formData = new FormData();
 formData.append('days',data.toString(','))
 formData.append('process',menuTxt.engTxt)
 formData.append('id',adminCtx?.state?.singleSettingItem?.id)
 if(answering_file)formData.append('answering_file',answering_file)
 formData.append('setting_name',state.setting_name)
 formData.append('start_time',state.start_time)
 formData.append('end_time',state.end_time)
 formData.append('start_day',state.start_day)
 formData.append('end_day',state.end_day)

 adminCtx.dispatch(editSettings(formData,adminCtx.dispatch))
  }
  
  return (
    <Paper style={{padding:'50px'}} elevation={3} >
    <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.setting_name}
            name='setting_name'
            handleChange={handleChange}  
            engLabel='Setting Name'
            jLabel='設定名'
            shrink={true}
          />
        </Grid>
        <Grid item xs={12}>
        <CustomTxt engTxt={'Target day'} japTxt={'設定日'} type='h5'style={{margin:0,padding:0}}/>
         <SettingsCheckBox handleChangeDay={handleChangeDay} state={day}/>
        </Grid>
       
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.start_time}
            name='start_time'
            handleChange={handleChange}  
            engLabel='Target time'
            jLabel='目標時間'
            type='time'
            engHelperTxt='Start'
            jHelperTxt='開始'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.end_time}
            name='end_time'
            handleChange={handleChange}  
            engLabel='Target time'
            jLabel='目標時間'
            type='time'
            engHelperTxt='End'
            jHelperTxt='終了'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.start_day}
            name='start_day'
            handleChange={handleChange}  
            engLabel='Target period'
            jLabel='設定期間'
            type='date'
            engHelperTxt='Start'
            jHelperTxt='始める'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            value={state.end_day}
            name='end_day'
            handleChange={handleChange}  
            engLabel='Target period'
            jLabel='設定期間'
            type='date'
            engHelperTxt='End'
            jHelperTxt='終わり'
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={4}>
          <CustomTxt engTxt={'Process'} japTxt={'設定内容'} type='h5'style={{margin:0,padding:0}}/>
          <StaticMenuBtn setmenuTxt={setmenuTxt} menuTxt={menuTxt} listArr={listArr} color='white' background='grey'/>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Grid item xs={12} md={5}>
          <CustomTxt engTxt={'Answering machine audio file'} japTxt={'留守番電話の音声ファイル'} type='h5'style={{margin:0,padding:0}}/>

            <div>
              <input type='file' id='edit-uploads'  onChange={handleFileUpload}  />
              
            </div>
          </Grid>
        </Grid>

        <Grid item sm={6} md={2}>
          <Button disabled={adminCtx.state.loadings.isLoading} variant="contained" color="primary" onClick={handleSubmit}>
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
//<Button className={classes.btn} variant="contained" color="primary"><CustomTxt engTxt={'Upload'} japTxt={'アップロード'} type='p'style={{margin:0,padding:0,color:'white'}}/></Button>
