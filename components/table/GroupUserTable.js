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

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});




function GroupUserTable() {
  const classes = useStyles();
  const sAdminCtx = React.useContext(SuperAdminContext);
  
const rows = [
  {
    name : <CustomTxt key={11} engTxt='Name' japTxt='名前'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:`${sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.group_name}`
  },


  {
    name : <CustomTxt key={10} engTxt='Email' japTxt='メールアドレス'  type='p' style={{fontSize:'12px',margin:0,padding:0}}/>,
    content:sAdminCtx?.state?.singleAdminGroupItem?.userDetails?.group_email
  },


];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><CustomTxt engTxt='Item' japTxt='アイテム'  type='p' style={{fontWeight:'bolder'}}/></TableCell>
            <TableCell align="right"><CustomTxt engTxt='Content' japTxt='コンテンツ'  type='p' style={{fontWeight:'bolder'}}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
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
export default GroupUserTable