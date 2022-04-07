import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TablePagination } from '@material-ui/core';
import CustomTxt from '../customTxt/CustomTxt';

import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../spinner.js/Spinner';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { AuthContext } from '../../store/auth/AuthStore';
import { changeGroupStatus, deletSingleAdminGroup, getSingleAdminGroup, getUniqueID, listAdminGroup} from '../../store/superAdmin/SuperAdminAction';
import Switch from '@material-ui/core/Switch';
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

const TCell = ({row}) => {
  const classes = useStyles();
  const authCtx = React.useContext(AuthContext);
  const sAdminCtx = React.useContext(SuperAdminContext);
  const [switchBtn, setswitchBtn] = React.useState(row.status === 'active' ? true : false);

  //const [switchBtn, setswitchBtn] = React.useState(row.status);

  const handleChange = (event) => {
    

    setswitchBtn(event.target.checked);
    sAdminCtx.dispatch(changeGroupStatus({id:row.id,status : event.target.checked ? 'active':'inactive'},sAdminCtx.dispatch))
  };
 
  const date = new Date(row.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  const plan = authCtx.state.user.plan.filter(plan => plan.id == row.plan_id);
 
  return (
    <>
       
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
            align="left" 
            >
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
          <TableCell style={{cursor:'pointer'}} onClick={() =>  sAdminCtx.dispatch(getSingleAdminGroup({id:row.id},sAdminCtx.dispatch))} align="left" >{date}</TableCell>
        
     </>
      )
}


 function AdminGroupsTable({setinView}) {
  const classes = useStyles();
  const sAdminCtx = React.useContext(SuperAdminContext);

  const [itemsToDelete, setitemsToDelete] = React.useState([]);

 
  
 
    const header = [

      <span key={1} className={classes.title2}><CustomTxt engTxt='Name' japTxt='名前' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Email' japTxt='メールアドレス' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Main External Number' japTxt='代表外線番号' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Subdomain' japTxt='サブドメイン' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Plan' japTxt='プラン' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',textAlign:'center'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Status' japTxt='状態' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',textAlign:'center',width:'100%'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Registered' japTxt='登録済' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
    ]
    const handleAddNew = () => {
      // setinView('add admin')
      sAdminCtx.dispatch(getUniqueID(sAdminCtx.dispatch))
     };
    const handleClick = (pg) => {
     
      sAdminCtx.dispatch(listAdminGroup(sAdminCtx.dispatch,pg))
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
                <Button variant="outlined" color="primary" size="small" onClick={handleAddNew} disabled={sAdminCtx.state.loadings.getUniqueIdLoading}>
                    <CustomTxt engTxt='Add New' japTxt='新規追加'  style={{fontSize:'10px',margin:0,color:'inherit'}} type='p'/>
                <AddIcon/>
                </Button>
                </TableCell>
              </TableRow>
              <TableRow >
                  {
                      header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center">{header}</TableCell></React.Fragment> )
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
   {
    sAdminCtx.state.loading ? '' : (
      <div className={classes.pagination}>
        <Pagination 
        handleClick={handleClick}
        sAdmin={true}
        data={
          {
            current_page:  sAdminCtx?.state?.adminGrouptable.current_page,
            prev_page_url:  sAdminCtx?.state?.adminGrouptable.prev_page_url,
            next_page_url:  sAdminCtx?.state?.adminGrouptable.next_page_url,
            last_page:  sAdminCtx?.state?.adminGrouptable.last_page,
          }
        }
        />
      </div>

    )
   }
    </>
  );
}
export default AdminGroupsTable;