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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../spinner.js/Spinner';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { AuthContext } from '../../store/auth/AuthStore';
import { changeGroupStatus, deletSingleAdminGroup, getSingleAdminGroup} from '../../store/superAdmin/SuperAdminAction';
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
    width:'60%'
  },
  pagination:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'flex-start',
    width:'100%'
  }
  
}));

const TCell = ({row,setitemsToDelete,itemsToDelete}) => {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  
  const date = new Date(row.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  const plan = authCtx.state.user.plan.filter(plan => plan.id == row.plan_id);
  const handleCheck = () => {
    
    setitemsToDelete([...itemsToDelete,row.id])
  }
  const handleUnCheck = () => {
    
    const data = itemsToDelete.filter(item => item != row.id)
    setitemsToDelete(data)
    
  }
  return (
    <>
       
          <TableCell align="left" >
          {
            itemsToDelete.find(item => item == row.id) ? (
              <CheckBoxIcon onClick={handleUnCheck} className={classes.check} style={{color:'green',alignSelf:'center'}}/>

              ) : (
                <CheckBoxOutlineBlankIcon onClick={handleCheck} className={classes.check} style={{color:'lightgreen',alignSelf:'center'}}/> 
            )
           }
          </TableCell>
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" >{row.first_name} {row.last_name}</TableCell>
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" >{row.email}</TableCell>
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" >{row.external_number}</TableCell>
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" >{row.subdomain}</TableCell>
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" ><p style={{padding:'5px',margin:'0',background:'#D1E4FF',borderRadius:'5px',textAlign:'center',fontSize:'10px'}}>
          {
            plan.length > 0 ? plan[0].plan_name : 'none'
          }
          </p></TableCell>
          <TableCell 
            style={{cursor:'pointer'}} 
            onClick={() =>  sAdminCtx.dispatch(changeGroupStatus({id:row.id,status : row.status === 'active' ? 'inactive' : 'active'},sAdminCtx.dispatch))} 
            align="left" 
            >
            <p 
            style={{padding:'5px',margin:'0',background:row.status === 'active' ? 'green' :'yellow',borderRadius:'5px',textAlign:'center',fontSize:'10px',color:row.status === 'active' ? 'white':'black'}}>
            {row.status}
            </p>
          </TableCell>
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" >{date}</TableCell>
        
     </>
      )
}


 function AdminGroupsTable({rows,setinView}) {
  const classes = useStyles();
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [page, setPage] = React.useState(0);
  const [itemsToDelete, setitemsToDelete] = React.useState([]);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
 
    const header = [
      <span key={0} className={classes.title}> <CheckBoxOutlineBlankIcon className={classes.title} style={{color:'lightgreen'}}/></span>,
      <span key={1} className={classes.title2}><CustomTxt engTxt='Name' japTxt='名前' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Email' japTxt='メールアドレス' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Main External Number' japTxt='代表外線番号' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Subdomain' japTxt='サブドメイン' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Plan' japTxt='プラン' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Status' japTxt='状態' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Registered' japTxt='登録済' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/><ArrowDownwardIcon style={{color:'lightgreen'}}/></span>,
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const handleDelete = () => {
        setitemsToDelete([])
        sAdminCtx.dispatch(deletSingleAdminGroup(itemsToDelete,sAdminCtx.dispatch))
      };

  return (
    <>
   {
    sAdminCtx.state.loading ? (<Spinner style={{width:'100%',height:'20vh'}}/>):(
        <TableContainer component={Paper} className={classes.tableCont} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt='Groups' japTxt='グループ' color='#174A84' type='h4' style={{width:'100px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell align="right" >
                <Button variant="outlined" color="primary" size="small" onClick={() => setinView('add admin')}>
                    <CustomTxt engTxt='Add New' japTxt='新規追加'  style={{fontSize:'10px',margin:0,color:'inherit'}} type='p'/>
                <AddIcon/>
                </Button>
                </TableCell>
                <TableCell align="right"><DeleteIcon onClick={handleDelete} style={{color: itemsToDelete.length > 0 ? 'red':'lightgrey',cursor:itemsToDelete.length > 0 ? 'pointer':'default'}}/></TableCell>
    
              </TableRow>
              <TableRow >
                  {
                      header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center" style={{width: i===0 ? '2vw' :''}} >{header}</TableCell></React.Fragment> )
                  }
              </TableRow>
            </TableHead>
            <TableBody>
              {
              
                sAdminCtx?.state?.adminGrouptable?.data?.map((row, i) => (
                  <TableRow hover key={i}>
                  <TCell row={row} setitemsToDelete={setitemsToDelete} itemsToDelete={itemsToDelete}/>
                  </TableRow>
                ))
            }
            </TableBody>
          </Table>
        </TableContainer>

    )
   }
    <div className={classes.pagination}>
      <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    
    </div>
    </>
  );
}
export default AdminGroupsTable;