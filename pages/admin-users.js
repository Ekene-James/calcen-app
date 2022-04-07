import { useRouter } from 'next/router';
import React from 'react';
import AddAdmin from '../components/addForm/AddAdmin';

import CustomTxt from '../components/customTxt/CustomTxt';
import EditAdminUser from '../components/editForm/EditAdminUser';
import CustomizedSnackbars from '../components/snackBar/SnackBar';
import AdminUserTable from '../components/table/AdminUserTable';
import { handleSnackBar, listAdminUser } from '../store/admin/AdminAction';
import { AdminContext } from '../store/admin/AdminStore';
import { onReload } from '../store/auth/AuthActions';
import { AuthContext } from '../store/auth/AuthStore';

const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']
function AdminUsers() {
  const [inView, setinView] = React.useState('default');
  const {state,dispatch} = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const router = useRouter()
  React.useEffect(() => {
    dispatch(onReload('admin',router,dispatch))
  },[])

  React.useEffect(() => {
    adminCtx.dispatch(listAdminUser(adminCtx.dispatch))
  
  },[])

  React.useEffect(() => {
    if(adminCtx.state.success.addUserSuccess || adminCtx.state.success.editUserSuccess){
      adminCtx.dispatch(listAdminUser(adminCtx.dispatch))
      setinView('default')
    }
  

  },[adminCtx.state.success.addUserSuccess,adminCtx.state.success.editUserSuccess])
  let view;
  let header
  switch (inView) {
    case 'default':
      header= <CustomTxt engTxt='Admin users' japTxt='管理ユーザ一覧' color='#174A84' type='h3'/>
     view =  <AdminUserTable rows={rows} setinView={setinView}/>
      break;
    case 'add user':
      header = <CustomTxt engTxt='Add new admin user' japTxt='追加' color='#174A84' type='h3'/>
      view =  <AddAdmin setinView={setinView}/>
      break;
    case 'edit':
      header = <CustomTxt engTxt='Edit new admin user' japTxt='編集' color='#174A84' type='h3'/>
      view =  <EditAdminUser setinView={setinView}/>
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
AdminUsers.layout = "L2";
export default AdminUsers;
