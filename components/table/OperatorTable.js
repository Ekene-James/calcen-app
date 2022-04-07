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
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { AdminContext } from '../../store/admin/AdminStore';
import Spinner from '../spinner.js/Spinner';
import { addEdituser, getCallLogs, getUniqueNumbers, listOperators, userDetailView } from '../../store/admin/AdminAction';
import { AuthContext } from '../../store/auth/AuthStore';
import Pagination from '../pagination/Pagination';
const useStyles =makeStyles((theme) =>({
  table: {
    minWidth: 650,
  },

  check:{
  cursor:'pointer'
  
  },
  tableCont: {
  
    [theme.breakpoints.down('sm')]: {
     overflowX:'scroll',
     width:'48%'
    },

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

const TCell = ({row,setinView}) => {
  const classes = useStyles();
  const adminCtx = React.useContext(AdminContext);
  const authCtx = React.useContext(AuthContext);
  const date = new Date(row.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
const handleEdit =()=>{
  adminCtx.dispatch(addEdituser(row))
  setinView('edit')
}
const handleCallLog =()=>{
 adminCtx.dispatch(getCallLogs(adminCtx.dispatch,true))
  setinView('call log')
}

  return (
    <>
      
          <TableCell align="left" >{`${row?.first_name} ${row?.last_name}`}</TableCell>
          <TableCell align="left" >{row?.display_name}</TableCell>
          <TableCell align="left" >{row?.unique_id}</TableCell>
          <TableCell align="left" >{row?.email}</TableCell>
          
          <TableCell align="left" >{row.external_number}</TableCell>
          <TableCell align="left" onClick={handleCallLog} ><CustomTxt engTxt='Call Log' japTxt='通話記録' color='black' type='p' style={{padding:'5px',margin:'0',background:'#FDEDC8',borderRadius:'5px',textAlign:'center',cursor:'pointer',fontSize:'10px'}}/></TableCell>
          {
            authCtx.state.user.role ==='viewer' ? (<TableCell align="left" />): (

              <TableCell align="left" onClick={handleEdit} ><CustomTxt engTxt='Edit' japTxt='編集' color='black' type='p' style={{padding:'5px',margin:'0',background:'#FDEDC8',borderRadius:'5px',textAlign:'center',cursor:'pointer',fontSize:'10px'}}/></TableCell>
            )
          }
        
     </>
      )
}


 function OperatorTable({setinView}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const adminCtx = React.useContext(AdminContext);
    const authCtx = React.useContext(AuthContext);

    const header = [
      
      <span key={1} className={classes.title2}><CustomTxt engTxt='Name' japTxt='名前' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Display Name' japTxt='表示名' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Operator ID' japTxt='コンシェルジュID' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Email' japTxt='部屋番号' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='External No' japTxt='外部番号' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={5} className={classes.title2}></span>,
      <span key={5} className={classes.title2}></span>,
     
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const handleAddNew = () => {
       
        adminCtx.dispatch(getUniqueNumbers(adminCtx.dispatch,true))
       };
       const handleClick = (pg) => {
    
        adminCtx.dispatch(listOperators(adminCtx.dispatch,pg))
       };
  return (
    <>
   {
    adminCtx.state.loadings.isLoading ? (<Spinner style={{width:'100%',height:'20vh'}}/>):(
      <TableContainer component={Paper} className={classes.tableCont} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt={`Operators (${adminCtx?.state?.operators?.total})`} japTxt='コンシェルジュ一覧' color='#174A84' type='h4' style={{width:'100px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
              <TableCell align="center" />
              <TableCell align="center" />
              <TableCell align="center" />
              <TableCell align="center" />
              <TableCell align="center" />
            
             
              <TableCell align="right" >
              {
                authCtx.state.user.role ==='viewer' || authCtx.state.user.role ==='editor' ? '' : (

                  adminCtx.state.loadings.uniqueIdLoading ? (<Spinner size={25}/>) : (
                    <Button variant="outlined" color="primary" size="small" onClick={handleAddNew}>
                        <CustomTxt engTxt='Add New' japTxt='新規追加'  style={{fontSize:'10px',margin:0,color:'inherit'}} type='p'/>
                     <AddIcon/>
                    </Button>
  
                    )
                )
                }
              </TableCell>
            </TableRow>
            <TableRow >
                {
                    header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center" >{header}</TableCell></React.Fragment> )
                }
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCtx?.state?.operators?.data?.map((row, i) => (
              <TableRow hover key={i} >
              <TCell row={row} setinView={setinView}/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    )
   }
   {
    adminCtx.state.loadings.isLoading ? '' : (
      <div className={classes.pagination}>
        <Pagination 
        handleClick={handleClick}
        data={
          {
            current_page:  adminCtx?.state?.operators.current_page,
            prev_page_url:  adminCtx?.state?.operators.prev_page_url,
            next_page_url:  adminCtx?.state?.operators.next_page_url,
            last_page:  adminCtx?.state?.operators.last_page,
          }
        }
        />
      </div>

    )
   }
    </>
  );
}
export default OperatorTable;