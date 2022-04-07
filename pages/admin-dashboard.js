import React, { useEffect, useLayoutEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthContext } from '../store/auth/AuthStore';
import { makeStyles } from '@material-ui/core'

import CustomTxt from '../components/customTxt/CustomTxt';

import { onReload,  } from '../store/auth/AuthActions';
import { superAdminDash } from '../store/superAdmin/SuperAdminAction';
import { SuperAdminContext } from '../store/superAdmin/SuperAdminStore';

export const useStyles = makeStyles((theme) => ({
descCont:{
display:'flex',
alignItems:'center',
justifyContent:'flex-start',

marginTop:'3vw',
marginBottom:'7vw'
},
desc:{
  display:'flex',
  alignItems:'flex-start',
  justifyContent:'center',
  flexDirection:'column',
  marginRight:'5vw'

},

 
}));
const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']

export default function ADashboard() {
  const classes = useStyles();
  const router = useRouter()
  const {state,dispatch} = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  React.useEffect(() => {
    dispatch(onReload("superadmin",router,dispatch))
    sAdminCtx.dispatch(superAdminDash(sAdminCtx.dispatch))
  },[])
 
  return (
    <div className={classes.container}>
      <Head>
        <title>Calcen Super admin dashboard</title>
        <meta name="description" content="Calcen Super admin dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <CustomTxt engTxt='Dashboard' japTxt='ダッシュボード' color='#174A84' type='h3'/>
            <div>
              <div className={classes.descCont}>
                <div className={classes.desc}>
                 <CustomTxt engTxt='Number of Groups' japTxt='グループ数' type='p' style={{fontWeight:'500'}}/>
                 <h1>{sAdminCtx.state.superAdminDash.group}</h1>
               
                </div>
                <div className={classes.desc}>
                 <CustomTxt engTxt='Number of Operators' japTxt='コンシェルジュ数' type='p' style={{fontWeight:'500'}}/>
                 <h1>{sAdminCtx.state.superAdminDash.operators}</h1>
                </div>
              </div>
            </div>
     
    </div>
  )
}
ADashboard.layout = "L3";