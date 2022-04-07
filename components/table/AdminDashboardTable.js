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
    width:'60%'
  },
  pagination:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'flex-start',
    width:'100%'
  }
  
}));

const TCell = ({i}) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(false);
  return (
    <>
       
          <TableCell align="left" >
          {
            active ? (
              <CheckBoxIcon onClick={() => setActive(false)} className={classes.check} style={{color:'green',alignSelf:'center'}}/>

              ) : (
                <CheckBoxOutlineBlankIcon onClick={() => setActive(true)} className={classes.check} style={{color:'lightgreen',alignSelf:'center'}}/> 
            )
           }
          </TableCell>
          <TableCell align="left" >01-04-2021</TableCell>
          <TableCell align="left" >Company ABC</TableCell>
          <TableCell align="left" >Having Issue</TableCell>
          <TableCell align="left" >We are having issues a...</TableCell>
          <TableCell align="left" >Pending</TableCell>
     </>
      )
}


 function AdminDashboardUserTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const header = [
      <span key={0} className={classes.title}> <CheckBoxOutlineBlankIcon className={classes.title} style={{color:'lightgreen'}}/></span>,
      <span key={1} className={classes.title2}><CustomTxt engTxt='Inquiry date' japTxt='お問い合わせ日' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Group Name' japTxt='グループ名' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Title' japTxt='タイトル' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Content' japTxt='コンテンツ' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Status' japTxt='状態' style={{fontSize:'12px',fontWeight:'bold'}} color='#174A84' type='p'/></span>,
     
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
        {
          // <TableRow >
          //   <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt='Inquiry' japTxt='問い合わせ' color='#174A84' type='h4' style={{width:'100px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
          //   <TableCell align="center" />
          //   <TableCell align="center" />
          //   <TableCell align="center" />
          //   <TableCell align="center" />
          //   <TableCell align="center" />
          
          // </TableRow>

        }
          <TableRow >
              {
                  header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center" style={{width: i===0 ? '2vw' :''}} >{header}</TableCell></React.Fragment> )
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, i) => (
            <TableRow hover key={i}>
            <TCell/>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   <div className={classes.pagination}>
      <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={props.rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </div>
    </>
  );
}
export default AdminDashboardUserTable;