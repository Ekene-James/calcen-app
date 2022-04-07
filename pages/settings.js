import { useRouter } from 'next/router';
import React from 'react';
import AddUser from '../components/addForm/AddUser';
import CustomTxt from '../components/customTxt/CustomTxt';
import EditBussinessHour from '../components/settings/EditBussinessHour';
import SetBusinessHours from '../components/settings/SetBusinessHours';

import SettingDefault from '../components/settings/SettingDefault';
import CustomizedSnackbars from '../components/snackBar/SnackBar';
import { handleSnackBar, listSettings } from '../store/admin/AdminAction';
import { AdminContext } from '../store/admin/AdminStore';
import { onReload } from '../store/auth/AuthActions';
import { AuthContext } from '../store/auth/AuthStore';

const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']

function Settings() {
  const [inView, setinView] = React.useState('default');
    const {state,dispatch} = React.useContext(AuthContext);
    const adminCtx = React.useContext(AdminContext);
  const router = useRouter()
  React.useEffect(() => {
    dispatch(onReload('admin',router,dispatch))
  },[])

  React.useEffect(() => {
    adminCtx.dispatch(listSettings(adminCtx.dispatch))
  },[])

  React.useEffect(() => {
    if(adminCtx.state.success.addUserSuccess || adminCtx.state.success.deleteSettingsSuccess|| adminCtx.state.success.editUserSuccess ){
      adminCtx.dispatch(listSettings(adminCtx.dispatch))
      setinView('default')
    }
  

  },[adminCtx.state.success.addUserSuccess,adminCtx.state.success.deleteSettingsSuccess,adminCtx.state.success.editUserSuccess ])

  let view;
  let header;
  switch (inView) {
    case 'default':
      header=<CustomTxt engTxt='Settings' japTxt='設定' color='#174A84' type='h3'/>
     view =  <SettingDefault setinView={setinView}/>
      break;
    case 'set business hours':
      header=<CustomTxt engTxt='Setting business hours' japTxt='営業時間設定' color='#174A84' type='h3'/>
     view =  <SetBusinessHours setinView={setinView}/>
      break;
    case 'edit':
      header=<CustomTxt engTxt='Edit' japTxt='編集' color='#174A84' type='h3'/>
     view =  <EditBussinessHour setinView={setinView}/>
      break;
  
    default:
      break;
  }
  return <div>
      {header}
      {view}
      <CustomizedSnackbars type={adminCtx.state.snackBarObj.type} msg={adminCtx.state.snackBarObj.msg} open={adminCtx.state.snackBarObj.open} setOpen={() => adminCtx.dispatch(handleSnackBar({...adminCtx.state.snackBarObj,open:false}))} />
  </div>;
}
Settings.layout = "L2";
export default Settings;
