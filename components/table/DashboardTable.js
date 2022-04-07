import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { TablePagination } from '@material-ui/core';
import CustomTxt from '../customTxt/CustomTxt';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { AdminContext } from '../../store/admin/AdminStore';
import Pagination from '../pagination/Pagination';
const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 650,
  

  },
  tableCont: {
  
    [theme.breakpoints.down('sm')]: {
     overflowX:'scroll !important',
     width:'55%'
    },

  },

  check:{
  cursor:'pointer'
  
  },
  title:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'flex-start',
    cursor:'pointer'
  },
  title2:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    width:'100%'
  },
  pagination:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%',
    marginTop:'10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent:'flex-start',
      
     },
  }
  
}));

const TCell = ({row}) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(false);
  const date = new Date(row.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  return (
    <>
       
          <TableCell align="left" >{date}</TableCell>
          <TableCell align="left" >
          {
            row.operator_name && 
            <p  style={{padding:'0.2vw',margin:'0',background:'#D1E4FF',borderRadius:'0.5vw',textAlign:'center',fontWeight:'bold'}}>{row.operator_name}</p>
          }
          </TableCell>
          <TableCell align="left" >{row.call_duration || ''}</TableCell>
          <TableCell align="left" ><a style={{color:'blue'}} target='_blank' rel="noreferrer" href={row.recording_url || '#'}>{row.recording_url ? 'Link' : '-'}</a></TableCell>
          <TableCell align="left" >{row.response_detail || ''}</TableCell>
     </>
      )
}


 function DashboardTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const adminCtx = React.useContext(AdminContext);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const header = [
     
      <span key={1} className={classes.title2}><CustomTxt engTxt='Incoming date' japTxt='着信日時' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Operator' japTxt='オペレーター' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Talk time' japTxt='通話時間' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Voice message' japTxt='留守番電話' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Response details' japTxt='応答詳細' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
     
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

  return (
    <>
   
    <TableContainer component={Paper} className={classes.tableCont}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt='Call history' japTxt='通話履歴' color='#174A84' type='h4' style={{width:'100px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
            <TableCell align="center" />
            <TableCell align="center" />
            <TableCell align="center" />
            <TableCell align="center" />
       
          
          </TableRow>
          <TableRow >
              {
                  header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center" >{header}</TableCell></React.Fragment> )
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {adminCtx.state.adminDash.call_logs.map((row, i) => (
            <TableRow hover key={i}>
            <TCell row={row}/>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   <div className={classes.pagination}>
      { 
        // <Pagination/>
        }
    </div>
    </>
  );
}
export default DashboardTable;