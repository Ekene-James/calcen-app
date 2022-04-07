import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomTxt from '../customTxt/CustomTxt';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { AuthContext } from '../../store/auth/AuthStore';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});




function GroupDetailTable() {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  const plan = authCtx.state.user.plan.filter(plan => plan.id == sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.plan_id)
const rows = [
  {
    name : <CustomTxt key={1} engTxt='Name' japTxt='名前'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:`${sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.first_name} ${sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.last_name}`
  },
  {
    name : <CustomTxt key={2} engTxt='Subdomain' japTxt='サブドメイン'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content: sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.subdomain
  },

  {
    name : <CustomTxt key={3} engTxt='Email' japTxt='メールアドレス'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.email
  },
  {
    name : <CustomTxt key={4} engTxt='Group ID' japTxt='グループID'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.group_id
  },
  {
    name : <CustomTxt key={5} engTxt='Main External Number' japTxt='代表外線番号'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.external_number
  },
  {
    name : <CustomTxt key={6} engTxt='Plan' japTxt='プラン'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:plan.length > 0 ? plan[0].plan_name : '-'
  },

];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><CustomTxt engTxt='Item' japTxt='項目'  type='p' style={{fontWeight:'bolder'}}/></TableCell>
            <TableCell align="right"><CustomTxt engTxt='Content' japTxt='内容'  type='p' style={{fontWeight:'bolder'}}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default GroupDetailTable