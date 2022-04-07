import { useRouter } from 'next/router';
import React from 'react';
import AddOperator from '../components/addForm/AddOperator';

import CustomTxt from '../components/customTxt/CustomTxt';
import EditOperator from '../components/editForm/EditOperator';
import CustomizedSnackbars from '../components/snackBar/SnackBar';
import OperatorCallLog from '../components/table/OperatorCallLog';
import OperatorTable from '../components/table/OperatorTable';
import UserCallLogTable from '../components/table/UserCallLogTable';
import { handleSnackBar, listOperators, reset } from '../store/admin/AdminAction';
import { AdminContext } from '../store/admin/AdminStore';
import { onReload } from '../store/auth/AuthActions';
import { AuthContext } from '../store/auth/AuthStore';

const rows = 
  ['P.O Number','Date Received','Delivery Note','Status']
function Operators() {
  const [inView, setinView] = React.useState('default');
  const auhCtx = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const router = useRouter()
  React.useEffect(() => {


    auhCtx.dispatch(onReload('admin',router,auhCtx.dispatch))
  },[])

  React.useEffect(() => {
    if(adminCtx.state.success.uniqueIdSuccess){
      setinView('add operator')
    }
  },[adminCtx.state.success.uniqueIdSuccess])

  React.useEffect(() => {
    adminCtx.dispatch(listOperators(adminCtx.dispatch))
    if(adminCtx.state.success.addUserSuccess || adminCtx.state.success.editUserSuccess){
      setinView('default')
    }

  },[adminCtx.state.success.addUserSuccess,adminCtx.state.success.editUserSuccess])
  let view;
  let header;
  switch (inView) {
    case 'default':
     header= <CustomTxt engTxt='Operators' japTxt='コンシェルジュ一覧' color='#174A84' type='h3'/>
     view =  <OperatorTable setinView={setinView}/>
      break;
    case 'add operator':
      header=<CustomTxt engTxt='Add New Operator' japTxt='追加' color='#174A84' type='h3'/>
     view =  <AddOperator setinView={setinView}/>
      break;
    case 'edit':
      header= header= <CustomTxt engTxt='Edit Operator' japTxt='編集' color='#174A84' type='h3'/>
     view =  <EditOperator setinView={setinView}/>
      break;
    case 'call log':
      header=''
     view =  <OperatorCallLog rows={rows} setinView={setinView}/>
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
Operators.layout = "L2";
export default Operators;
