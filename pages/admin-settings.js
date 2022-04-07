import React from 'react';
import { useRouter } from 'next/router'
import AddPlan from '../components/addForm/AddPlan';

import CustomTxt from '../components/customTxt/CustomTxt';
import AdminSettingsTable from '../components/table/AdminSettingsTable';
import { AuthContext } from '../store/auth/AuthStore';
import { onReload } from '../store/auth/AuthActions';
import { getAdminPlanSettings, handleSnackBar } from '../store/superAdmin/SuperAdminAction';
import { SuperAdminContext } from '../store/superAdmin/SuperAdminStore';
import CustomizedSnackbars from '../components/snackBar/SnackBar';
import EditAdminPlanSettings from '../components/editForm/EditAdminPlanSettings';


const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']
function AdminSettings() {
  const [inView, setinView] = React.useState('default');
  const router = useRouter()
  const {state,dispatch} = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  React.useEffect(() => {
    dispatch(onReload('superadmin',router,dispatch))
  },[])

  React.useEffect(() => {
  
    sAdminCtx.dispatch(getAdminPlanSettings(sAdminCtx.dispatch))

    if(sAdminCtx.state.success.editAdminPlanSuccess || sAdminCtx.state.success.addAdminPlanSuccess){
      setinView('default')
    }
  },[sAdminCtx.state.success.addAdminPlanSuccess,sAdminCtx.state.success.editAdminPlanSuccess])

  let view;
  let header;
  switch (inView) {
    case 'default':
      header=<CustomTxt engTxt='Settings' japTxt='設定' color='#174A84' type='h3'/>
     view =  <AdminSettingsTable rows={rows} setinView={setinView}/>
      break;
    case 'add plan':
      header=<CustomTxt engTxt='Add Plan' japTxt='追加' color='#174A84' type='h3'/>
     view =  <AddPlan setinView={setinView}/>
      break;
    case 'edit':
      header=<CustomTxt engTxt='Edit Plan' japTxt='編集' color='#174A84' type='h3'/>
     view =  <EditAdminPlanSettings setinView={setinView}/>
      break;
  
    default:
      break;
  }
  return <div>
      {header}
      {view}
      <CustomizedSnackbars type={sAdminCtx.state.snackBarObj.type} msg={sAdminCtx.state.snackBarObj.msg} open={sAdminCtx.state.snackBarObj.open} setOpen={() => sAdminCtx.dispatch(handleSnackBar({...sAdminCtx.state.snackBarObj,open:false}))} />
  </div>;
}
AdminSettings.layout = "L3";
export default AdminSettings;
