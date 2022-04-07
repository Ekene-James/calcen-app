import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { AuthContext } from '../store/auth/AuthStore';
import { makeStyles } from '@material-ui/core'
import DashboardTable from '../components/table/DashboardTable';
import CustomTxt from '../components/customTxt/CustomTxt';
import { onReload, switchLang } from '../store/auth/AuthActions';
import { useRouter } from 'next/router'
import { adminDash } from '../store/admin/AdminAction';
import { AdminContext } from '../store/admin/AdminStore';
import Spinner from '../components/spinner.js/Spinner';

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

export default function Dashboard() {
  const classes = useStyles();
  const {state,dispatch} = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const router = useRouter()
  React.useEffect(() => {
    dispatch(onReload('admin',router,dispatch))

  },[])


  
  React.useEffect(() => {
    adminCtx.dispatch(adminDash(adminCtx.dispatch))

  },[])
 
  return (
    <div className={classes.container}>
      <Head>
        <title>Calcen Admin</title>
        <meta name="description" content="Calcen call app admin panel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <CustomTxt engTxt='Dashboard' japTxt='ダッシュボード' color='#174A84' type='h3'/>
          {
            adminCtx.state.loadings.isLoading ? (<Spinner style={{width:'100%',height:'20vh'}}/>):(
              <div>
              <div className={classes.descCont}>
                <div className={classes.desc}>
                 <CustomTxt engTxt='Number of Users' japTxt='ユーザ数' type='p' style={{fontWeight:'500'}}/>
                 <CustomTxt engTxt={adminCtx.state.adminDash.users} japTxt='' type='h1'/>
                </div>
                <div className={classes.desc}>
                 <CustomTxt engTxt='Number of Operators' japTxt='コンシェルジュ数' type='p' style={{fontWeight:'500'}}/>
                 <CustomTxt engTxt={adminCtx.state.adminDash.operators} japTxt='' type='h1'/>
                </div>
              </div>
  
                <DashboardTable rows={rows}/>
  
            </div>
            )
          }
          
     
    </div>
  )
}
Dashboard.layout = "L2";