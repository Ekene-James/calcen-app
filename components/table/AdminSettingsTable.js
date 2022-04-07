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
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { changeGroupSettingsStatus, editAdminPlan, getAdminPlanSettings } from '../../store/superAdmin/SuperAdminAction';
import Pagination from '../pagination/Pagination';
import Spinner from '../spinner.js/Spinner';
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
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [switchBtn, setswitchBtn] = React.useState(row.status === 'active' ? true : false);
    
  const date = new Date(row.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  const handleEdit = () => {
    sAdminCtx.dispatch(editAdminPlan(row))
    setinView('edit')
  }
  
  const handleChange = (event) => {
    setswitchBtn(event.target.checked);
    sAdminCtx.dispatch(changeGroupSettingsStatus({id:row.id,status : event.target.checked ? 'active':'inactive'},sAdminCtx.dispatch))
  };
  return (
    <>

          <TableCell align="left" >{row.plan_name}</TableCell>
          <TableCell align="left" >{row.plan_price}</TableCell>
          <TableCell align="left" >{row.max_user}</TableCell>
          <TableCell align="left" >{row.max_operator}</TableCell>
          <TableCell align="left" >
          <p>
          <span style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CustomTxt engTxt='inactive' japTxt='停止中' color='#174A84' type='small'/>
              <Switch
              checked={switchBtn}
              onChange={handleChange}
              color="primary"
              name={`switch${row.id}`}
              disabled={sAdminCtx.state.loadings.toggleActiveLoading}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <CustomTxt engTxt='active' japTxt='動作中' color='#174A84' type='small'/>
        </span>
          </p>
          </TableCell>
          <TableCell align="left" >{date}</TableCell>
          <TableCell align="left" style={{cursor:'pointer'}} onClick={handleEdit} ><CustomTxt engTxt='Edit' japTxt='編集' color='black' type='p' style={{padding:'5px',margin:'0',background:'#FDEDC8',borderRadius:'5px',textAlign:'center',cursor:'pointer',fontSize:'10px'}}/></TableCell>
        
     </>
      )
}


 function AdminSettingsTable({setinView}) {
  const classes = useStyles();
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const header = [
    
      <span key={1} className={classes.title2}><CustomTxt engTxt='Name' japTxt='名前' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Price (monthly)' japTxt='金額（月額）' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Max. number of users' japTxt='ユーザ数' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Max. number of operators' japTxt='コンシェルジュ数' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Status' japTxt='状態' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',textAlign:'center',width:'100%'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Registered' japTxt='登録済' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={5} className={classes.title2}></span>,
 
      
     
    ]
    const handleClick = (pg) => {
    
      sAdminCtx.dispatch(getAdminPlanSettings(sAdminCtx.dispatch,pg))
     };


  return (
    <>
   {
    sAdminCtx.state.loading ? (<Spinner style={{width:'100%',height:'20vh'}}/>) : (
          <TableContainer component={Paper} className={classes.tableCont} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt='Plan Settings' japTxt='プラン設定' color='#174A84' type='h4' style={{width:'220px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="center" />
              
                <TableCell align="center" >
                <Button variant="outlined" color="primary" size="small" onClick={() => setinView('add plan')}>
                    <CustomTxt engTxt='Add New' japTxt='新規追加'  style={{fontSize:'10px',margin:0,color:'inherit'}} type='p'/>
                <AddIcon/>
                </Button>
                </TableCell>
              
              
              </TableRow>
              <TableRow >
                  {
                      header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center"  >{header}</TableCell></React.Fragment> )
                  }
              </TableRow>
            </TableHead>
            <TableBody>
          {
         
           sAdminCtx?.state?.adminPlanSettingsTable?.data?.map((row, i) => (
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
      sAdminCtx.state.loading ? '' : (
        <div className={classes.pagination}>
          <Pagination 
          handleClick={handleClick}
          sAdmin={true}
          data={
            {
              current_page:  sAdminCtx?.state?.adminPlanSettingsTable.current_page,
              prev_page_url:  sAdminCtx?.state?.adminPlanSettingsTable.prev_page_url,
              next_page_url:  sAdminCtx?.state?.adminPlanSettingsTable.next_page_url,
              last_page:  sAdminCtx?.state?.adminPlanSettingsTable.last_page,
            }
          }
          />
        </div>
  
      )
     }
    </>
  );
}
export default AdminSettingsTable;