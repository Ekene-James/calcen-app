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
import { Switch, TablePagination } from '@material-ui/core';
import CustomTxt from '../customTxt/CustomTxt';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../spinner.js/Spinner';
import { AdminContext } from '../../store/admin/AdminStore';
import { addEdituser, deleteAdminUser, listAdminUser, toggleAdminUserStatus } from '../../store/admin/AdminAction';
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
  const authCtx = React.useContext(AuthContext);
  const adminCtx = React.useContext(AdminContext);
  const [switchBtn, setswitchBtn] = React.useState(row.status === 'active' ? true : false);
    let color='white';
    let bg;
    if(row.role.toLowerCase() === 'editor'){
      color='black';
      bg='#FFC107'
    }else if(row.role.toLowerCase() === 'manager'){
      bg='red'
    }else{
      bg ='#17A2B8'
    }
    const handleChange = (event) => {
      setswitchBtn(event.target.checked);
      adminCtx.dispatch(toggleAdminUserStatus({id:row.id,status : event.target.checked ? 'active':'inactive'},adminCtx.dispatch))
    };
    const handleEdit=() => {
      adminCtx.dispatch(addEdituser(row))
      setinView('edit')
    }
    const handleDelete=() => {
      adminCtx.dispatch(deleteAdminUser({id:row.id},adminCtx.dispatch))
   
    }
  
  return (
    <>
          <TableCell align="left" >{`${row.first_name} ${row.last_name}`}</TableCell>
          <TableCell align="left" >{row.email}</TableCell>
          <TableCell align="left" ><p  style={{background:bg,color,padding:'2px 4px',textAlign:'center',borderRadius:'5px',margin:0}}>{row.role}</p></TableCell>
          <TableCell align="left" >
            {
              authCtx.state.user.role ==='viewer' ? row.status : (
                <span style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <CustomTxt engTxt='inactive' japTxt='停止中' color='#174A84' type='small'/>
                    <Switch
                    checked={switchBtn}
                    onChange={handleChange}
                    color="primary"
                    name={`switch${row.id}`}
                    disabled={adminCtx.state.loadings.switchLoading}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <CustomTxt engTxt='active' japTxt='動作中' color='#174A84' type='small'/>
              </span>
              )
            }
          </TableCell>
          <TableCell align="left" >{row.last_login_time || ''}</TableCell>
          <TableCell align="right" >
          {
              authCtx.state.user.role ==='viewer' ? '': (
                <Button variant="contained" style={{background:'#FFEFCA'}} onClick={handleEdit}>
                    <CustomTxt engTxt='Edit' japTxt='編集' color='black' type='p' style={{padding:'0',margin:'0'}}/>
                </Button>
              )
          }
           </TableCell>
          <TableCell align="right" >
          {
            
              authCtx.state.user.role ==='viewer' || authCtx.state.user.role ==='editor' ? '': (
                <Button variant="contained" color="secondary" onClick={handleDelete} disabled={adminCtx.state.loadings.loadingId == row.id && adminCtx.state.loadings.deleteLoading ? true : false}>
                    <CustomTxt engTxt='Delete' japTxt='削除' type='p' style={{padding:'0',margin:'0',color:'white'}}/>
                </Button>
              )
          }
           </TableCell>
        
     </>
      )
}


 function AdminUserTable({setinView}) {
  const classes = useStyles();
  const adminCtx = React.useContext(AdminContext);
  const authCtx = React.useContext(AuthContext);
  const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const header = [
     
      <span key={1} className={classes.title2}><CustomTxt engTxt='Name' japTxt='名前' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Email' japTxt='メールアドレス' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Role' japTxt='権限' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',textAlign:'center',width:'100%'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Status' japTxt='状態' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',textAlign:'center',width:'100%'}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='last_logged_in' japTxt='最後にログインしました' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
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
      const handleClick = (pg) => {
    
        adminCtx.dispatch(listAdminUser(adminCtx.dispatch,pg))
       };
  return (
    <>
   {
    adminCtx.state.loadings.isLoading  ? (<Spinner style={{width:'100%',height:'20vh'}}/>):(
      <TableContainer component={Paper} className={classes.tableCont} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt='Admin users' japTxt='管理ユーザ一覧' color='#174A84' type='h4' style={{width:'100px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
              <TableCell align="center" />
              <TableCell align="center" />
              <TableCell align="center" />
              <TableCell align="center" />
              <TableCell align="center" />
           
              <TableCell align="right" >
              {
                authCtx.state.user.role ==='viewer' || authCtx.state.user.role ==='editor' ? '' : (
                  <Button variant="outlined" color="primary" size="small" onClick={() => setinView('add user')}>
                      <CustomTxt engTxt='Add New' japTxt='新規追加'  style={{fontSize:'10px',margin:0,color:'inherit'}} type='p'/>
                   <AddIcon/>
                  </Button>
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
            {adminCtx?.state?.adminUsers?.data?.map((row, i) => (
              <TableRow hover key={i}>
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
            current_page:  adminCtx?.state?.adminUsers.current_page,
            prev_page_url:  adminCtx?.state?.adminUsers.prev_page_url,
            next_page_url:  adminCtx?.state?.adminUsers.next_page_url,
            last_page:  adminCtx?.state?.adminUsers.last_page,
          }
        }
        />
      </div>

    )
   }
    </>
  );
}
export default AdminUserTable;