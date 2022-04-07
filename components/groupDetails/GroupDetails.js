import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';
import TextInput from '../textInput/TextInput';
import MenuBtn from '../menuBtn/MenuBtn';
import CustomTxt from '../customTxt/CustomTxt';
import GroupDetailTable from '../table/GroupDetailTable';
import SimpleSelect from '../textInput/Select';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import GroupUserTable from '../table/GroupUserTable';


const useStyles = makeStyles((theme) => ({

    groupDetails:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:'100%' ,
      flexDirection:'column',
      margin:'10px 0'
    },
    numberDescCont:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    
    },
    groupDetailsHeader:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      width:'100%' 
    },

 

}));

export default function GroupDetails({setinView}) {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
 const handleBack = () => {
    setinView('default')
 }
 const handleEdit = () => {
     setinView('edit admin')
   
 }

  return (
  <>
    <Button variant="contained" color="primary" size='small' onClick={handleBack}>
        <CustomTxt engTxt='Go Back' japTxt='戻る' color='white' type='small' style={{margin:0,padding:0}}/>
    </Button>
  
    <Grid container spacing={6}>
   
    <Grid item xs={12} md={6}>
    <div className={classes.groupDetails}>
        <div className={classes.groupDetailsHeader}>
            <CustomTxt engTxt='Group Detail' japTxt='グループ詳細' color='#174A84' type='h3'/>
            <Button variant="contained" color="primary" size='small' onClick={handleEdit}>
                <CustomTxt engTxt='Edit' japTxt='編集' color='white' type='small' style={{margin:0,padding:0}}/>
            </Button>
        </div>
      <GroupDetailTable/>
     </div>

     <div className={classes.groupDetails}>
     <div className={classes.groupDetailsHeader}>
         <CustomTxt engTxt='Group Admin User' japTxt='グループ管理ユーザ' color='#174A84' type='h3'/>
         <Button variant="contained" color="primary" size='small' onClick={handleEdit}>
             <CustomTxt engTxt='Edit' japTxt='編集' color='white' type='small' style={{margin:0,padding:0}}/>
         </Button>
     </div>
   <GroupUserTable/>
  </div>

    </Grid>
    

     
    <Grid item xs={12} md={6}>
    <div className={classes.groupDetails}>
    <div className={classes.groupDetailsHeader}>
        <CustomTxt engTxt='Usage' japTxt='使用量' color='#174A84' type='h3'/>
    </div>
{    
    // <div style={{justifyContent:'space-around'}} className={classes.groupDetailsHeader}>
    //     <SimpleSelect name='tp1' label='Target Period' jLabel='設定期間' arr={['12-2-22','1-2-22']}/>
    //     <SimpleSelect name='tp2' label='Target Period' jLabel='設定期間' arr={['12-2-22','1-2-22']}/>
       
    // </div>
}

 </div>


        <div>
        <CustomTxt engTxt='Extension' japTxt='内線' color='#174A84' type='h3'/>
        <div className={classes.groupDetailsHeader}>
            <div className={classes.numberDescCont}>
                <CustomTxt engTxt='Number of calls' japTxt='発信数'  type='h5'/>
              
                <h1 style={{fontWeight:'bolder'}}>{sAdminCtx?.state?.singleAdminGroupItem?.extension_number_of_calls}</h1>
            </div>
            <div className={classes.numberDescCont}>
            <CustomTxt engTxt='Duration of calls' japTxt='通話時間'  type='h5'/>
                
                <h1 style={{fontWeight:'bolder'}}>{sAdminCtx?.state?.singleAdminGroupItem?.extension_duration_of_calls}</h1>
            </div>
        </div>
        </div>

        <div>
        <CustomTxt engTxt='External' japTxt='外部の' color='#174A84' type='h3'/>
        <div className={classes.groupDetailsHeader}>
            <div className={classes.numberDescCont}>
            <CustomTxt engTxt='Number of calls' japTxt='発信数'  type='h5'/>
                <h1 style={{fontWeight:'bolder'}}>{sAdminCtx?.state?.singleAdminGroupItem?.external_number_of_calls}</h1>
            </div>
            <div className={classes.numberDescCont}>
                <CustomTxt engTxt='Duration of calls' japTxt='通話時間'  type='h5'/>
                <h1 style={{fontWeight:'bolder'}}>{sAdminCtx?.state?.singleAdminGroupItem?.external_duration_of_calls}</h1>
            </div>
        </div>
        </div>
    </Grid>
       
        
    </Grid>
    </>
  );
}
