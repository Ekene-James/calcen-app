import { useRouter } from 'next/router';
import React from 'react';
import AddUser from '../components/addForm/AddUser';
import CustomTxt from '../components/customTxt/CustomTxt';
import EditUser from '../components/editForm/EditUser';
import CustomizedSnackbars from '../components/snackBar/SnackBar';
import UserCallLogTable from '../components/table/UserCallLogTable';
import UsersTable from '../components/table/UsersTable';
import { handleSnackBar, listUsers, reset } from '../store/admin/AdminAction';
import { AdminContext } from '../store/admin/AdminStore';
import { onReload } from '../store/auth/AuthActions';
import { AuthContext } from '../store/auth/AuthStore';
const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']
function Users() {
  const [inView, setinView] = React.useState('default');
    const {state,dispatch} = React.useContext(AuthContext);
    const adminCtx = React.useContext(AdminContext);
  const router = useRouter()
  React.useEffect(() => {
    dispatch(onReload('admin',router,dispatch))

  },[])

  React.useEffect(() => {
    if(adminCtx.state.success.uniqueIdSuccess){
      setinView('add user')
    }
  },[adminCtx.state.success.uniqueIdSuccess])

  React.useEffect(() => {
    adminCtx.dispatch(listUsers(adminCtx.dispatch))
    if(adminCtx.state.success.addUserSuccess || adminCtx.state.success.editUserSuccess){
      setinView('default')
    }
  

  },[adminCtx.state.success.addUserSuccess,adminCtx.state.success.editUserSuccess])
  let view;
  let header;
  switch (inView) {
    case 'default':
      header= <CustomTxt engTxt='Users' japTxt='ユーザ一覧' color='#174A84' type='h3'/>
     view =  <UsersTable rows={rows} setinView={setinView}/>
      break;
    case 'add user':
      header= <CustomTxt engTxt='Add New User' japTxt='追加' color='#174A84' type='h3'/>
     view =  <AddUser setinView={setinView}/>
      break;
    case 'edit':
      header= <CustomTxt engTxt='Edit User' japTxt='編集' color='#174A84' type='h3'/>
     view =  <EditUser setinView={setinView}/>
      break;
      case 'call log':
      header=''
     view =  <UserCallLogTable rows={rows} setinView={setinView}/>
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
Users.layout = "L2";
export default Users;
