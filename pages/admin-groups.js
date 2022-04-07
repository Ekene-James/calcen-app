import React from 'react';
import AddUser from '../components/addForm/AddUser';
import AdminAddGroup from '../components/addForm/AdminAddGroup';
import CustomTxt from '../components/customTxt/CustomTxt';
import GroupDetails from '../components/groupDetails/GroupDetails';
import AdminGroupsTable from '../components/table/AdminGroupsTable';
import { onReload } from '../store/auth/AuthActions';
import { AuthContext } from '../store/auth/AuthStore';
import { useRouter } from 'next/router'
import CustomizedSnackbars from '../components/snackBar/SnackBar'
import { getPlan, handleSnackBar, listAdminGroup } from '../store/superAdmin/SuperAdminAction';
import { SuperAdminContext } from '../store/superAdmin/SuperAdminStore';
import EditAdminGroup from '../components/editForm/EditAdminGroup';

const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']
function AdminGroups() {
  const [inView, setinView] = React.useState('default');
  const router = useRouter()
  const {state,dispatch} = React.useContext(AuthContext);

  const sAdminCtx = React.useContext(SuperAdminContext);

  React.useEffect(() => {
    dispatch(onReload('superadmin',router,dispatch))
  },[])
  React.useEffect(() => {  
    sAdminCtx.dispatch(listAdminGroup(sAdminCtx.dispatch))
  },[])
  React.useEffect(() => {
    if(sAdminCtx.state.success.uniqueIdSuccess){
      setinView('add admin')
    } 
  },[sAdminCtx.state.success.uniqueIdSuccess])

  React.useEffect(() => {

    if(sAdminCtx.state.success.editSingleAdminItemSuccess || sAdminCtx.state.success.addAdminGroupSuccess){ 
    sAdminCtx.dispatch(listAdminGroup(sAdminCtx.dispatch))
      setinView('default') 
    }
  },[sAdminCtx.state.success.editSingleAdminItemSuccess,sAdminCtx.state.success.addAdminGroupSuccess])



  React.useEffect(() => {
    if(sAdminCtx.state.success.singleAdminItemSuccess){
      setinView('details')
    }

}, [sAdminCtx.state.success.singleAdminItemSuccess])
  
  let view;
  let header1='';
  let header2='';
  switch (inView) {
    case 'default':
     header1=''
     view =  <AdminGroupsTable rows={rows} setinView={setinView}/>
      break;
    case 'add admin':
     header1=  <CustomTxt engTxt='Add new Group' japTxt='新規追加' color='#174A84' type='h3'/>
     header2=  <CustomTxt engTxt='Add Admin User for Group' japTxt='新規追加' color='#174A84' type='h3'/>
     view =  <AdminAddGroup setinView={setinView}/>
      break;
    case 'edit admin':
     header1=  <CustomTxt engTxt='Edit Group' japTxt='編集' color='#174A84' type='h3'/>
     header2=  <CustomTxt engTxt='Edit Admin User for Group' japTxt='編集' color='#174A84' type='h3'/>
     view =  <EditAdminGroup setinView={setinView}/>
      break;
    case 'details':
   
     view =  <GroupDetails setinView={setinView}/>
      break;
  
    default:
      break;
  }
  return <div>
  <div style={{width:'100%', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  {header1}
  {header2}
  </div>
  {view}
    
  <CustomizedSnackbars type={sAdminCtx.state.snackBarObj.type} msg={sAdminCtx.state.snackBarObj.msg} open={sAdminCtx.state.snackBarObj.open} setOpen={() => sAdminCtx.dispatch(handleSnackBar({...sAdminCtx.state.snackBarObj,open:false}))} />
  </div>
}
AdminGroups.layout = "L3";
export default AdminGroups;
