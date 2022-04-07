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
import { addEdituser, getCallLogs } from '../../store/admin/AdminAction';
import Spinner from '../spinner.js/Spinner';
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
  const adminCtx = React.useContext(AdminContext);
 const date = new Date(row.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})


  return (
    <>
      
          <TableCell align="left" >{date}</TableCell>
          <TableCell align="left" >
          {
            row.operator_name &&
            <p style={{padding:'0.2vw',margin:'0',background:'#D1E4FF',borderRadius:'0.5vw',textAlign:'center',fontWeight:'bold'}}>{row.operator_name}</p>
          }
          </TableCell>
          <TableCell align="left" >{row.call_duration}</TableCell>
          <TableCell align="left" >{row.call_status}</TableCell>
          <TableCell align="left" >{row.type}</TableCell>
          <TableCell align="left" ><a style={{color:'blue'}} target='_blank' rel="noreferrer" href={row.recording_url || '#'}>{row.recording_url ? 'Link' : '-'}</a></TableCell>
     </>
      )
}


 function UserCallLogTable({setinView,rows}) {
  const classes = useStyles();

    const adminCtx = React.useContext(AdminContext);

    const header = [
      <span key={1} className={classes.title2}><CustomTxt engTxt='Date Time' japTxt='日時' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Operator Name' japTxt='コンシェルジュ名' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Talk Time' japTxt='通話時間' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Call status' japTxt='ステータス' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Call type' japTxt='種別' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Recording' japTxt='録音中' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold',margin:0}}/></span>,
    ]

 
      const handleClick = (pg) => {
    
        adminCtx.dispatch(getCallLogs(adminCtx.dispatch,false,pg))
       };

  return (
    <>
    {
      adminCtx.state.loadings.isLogLoading ? (<Spinner style={{width:'100%',height:'20vh'}}/>):(
        <>
            <Button style={{marginBottom:'50px'}} onClick={() => setinView('default')} variant="contained" color="primary" size='small'>
            <CustomTxt engTxt='Back' japTxt='戻る'  style={{fontSize:'9px',margin:0,color:'white'}} type='p'/>
          </Button>
            <TableContainer component={Paper} className={classes.tableCont} >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell style={{position:'relative',height:'6vh'}} align="left" ><CustomTxt engTxt={`Call History`} japTxt='通話履歴' color='#174A84' type='h4' style={{width:'100px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/></TableCell>
                    <TableCell align="center" />
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
                  {
                    adminCtx?.state?.logs?.logs?.data?.map((row, i) => (
                    <TableRow hover key={i} >
                    <TCell row={row}/>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </>
      )
    }
    {
      adminCtx.state.loadings.isLogLoading ? '' : (
        <div className={classes.pagination}>
          <Pagination 
          handleClick={handleClick}
          data={
            {
              current_page:   adminCtx?.state?.logs?.logs?.current_page,
              prev_page_url:   adminCtx?.state?.logs?.logs?.prev_page_url,
              next_page_url:   adminCtx?.state?.logs?.logs?.next_page_url,
              last_page:   adminCtx?.state?.logs?.logs?.last_page,
            }
          }
          />
        </div>
  
      )
     }
    </>
  );
}
export default UserCallLogTable;