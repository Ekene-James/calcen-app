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
import TextInput from '../textInput/TextInput';
import { AdminContext } from '../../store/admin/AdminStore';
import Spinner from '../spinner.js/Spinner';
import { AuthContext } from '../../store/auth/AuthStore';
import { deleteAdminSetting, listSettings, singleSettingItem } from '../../store/admin/AdminAction';
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

  const handleDelete = () => {
      adminCtx.dispatch(deleteAdminSetting({id:row.id},adminCtx.dispatch))
  }
  const handleEdit = () => {
      adminCtx.dispatch(singleSettingItem(row))
      setinView('edit')
  }

  return (
    <>
    
          <TableCell align="left" >{row.id}</TableCell>
          <TableCell align="left" >{row.setting_name}</TableCell>
          <TableCell align="left" >{row.days}</TableCell>
          <TableCell align="left" >{row.start_time} - {row.end_time}</TableCell>
          <TableCell align="left" >{row.start_day}<br/> {row.end_day}</TableCell>
          <TableCell align="left" >{row.process}</TableCell>
          <TableCell align="left" >
           {
            
            authCtx.state.user.role ==='viewer' || authCtx.state.user.role ==='editor' ? '': (
              <Button variant="contained" color="secondary" onClick={handleDelete} disabled={adminCtx.state.loadings.loadingId == row.id && adminCtx.state.loadings.deleteLoading ? true : false}>
                  <CustomTxt engTxt='Delete' japTxt='削除' type='p' style={{padding:'0',margin:'0',color:'white'}}/>
              </Button>
              )
            }
            </TableCell>
          <TableCell  align="left" >
          {
            authCtx.state.user.role ==='viewer' ? (<TableCell align="left" />): (
              <Button variant="contained" color="primary" onClick={handleEdit} >
                <CustomTxt engTxt='Edit' japTxt='編集' color='white' type='p' style={{textAlign:'center',cursor:'pointer',margin:0,padding:0}}/>
              </Button>
            )
          }
        </TableCell>
           
         
        
     </>
      )
}


 function SettingDefault({setinView}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const adminCtx = React.useContext(AdminContext);
  const authCtx = React.useContext(AuthContext);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const header = [

      <span key={1} className={classes.title2}><CustomTxt engTxt='ID' japTxt='身元' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={2} className={classes.title2}><CustomTxt engTxt='Setting Name' japTxt='設定名' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={3} className={classes.title2}><CustomTxt engTxt='Setting day' japTxt='設定日' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={4} className={classes.title2}><CustomTxt engTxt='Time' japTxt='時間' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Period' japTxt='限目' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={5} className={classes.title2}><CustomTxt engTxt='Process' japTxt='設定内容' color='#174A84' type='p' style={{fontSize:'12px',fontWeight:'bold'}}/></span>,
      <span key={6} className={classes.title2}></span>,
      <span key={6} className={classes.title2}></span>,
     
     
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const handleClick = (pg) => {
    
        adminCtx.dispatch(listSettings(adminCtx.dispatch,pg))
       };

  return (
    <>
      
      {
        adminCtx.state.loadings.isLoading ? (<Spinner style={{width:'100%',height:'20vh'}}/>) : (<>
          <div style={{width:'30%',margin:'60px 0'}}>
            <TextInput
            value={authCtx?.state?.user?.external_number || ''} 
            engLabel='Operator main external number'
            jLabel='コンシェルジュ代表外線番号'
            readOnly={true}
            engHelperTxt='Automatically given by sysytem for group. Can not change. Operator can call to external number with this number.'
            jHelperTxt='システムによる自動割り当てとなり変更できません。コンシェルジュはこの番号を使って外線発信することができます。'
          />
      </div>

          <TableContainer component={Paper} className={classes.tableCont} >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell style={{position:'relative',height:'7vh'}} align="left" >
                  <CustomTxt engTxt='Bussiness hour settings' japTxt='営業時間設定' color='#174A84' type='h4' style={{width:'200px',position:'absolute',left:'1vw',top:'0.2vh',fontWeight:'bolder'}}/>
                  <CustomTxt engTxt='setting' japTxt='設定'  type='small' style={{width:'50px',position:'absolute',left:'1vw',top:'5vh'}}/>
                  </TableCell>
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center" />
               
             
                  <TableCell align="right" >
                  {
                    authCtx.state.user.role ==='viewer' || authCtx.state.user.role ==='editor' ? '' : (
                      <Button variant="outlined" color="primary" size="small" onClick={() => setinView('set business hours')}>
                          <CustomTxt engTxt='Add New' japTxt='新規追加'  style={{fontSize:'10px',margin:0,color:'inherit'}} type='p'/>
                       <AddIcon/>
                      </Button>
                      )
                  }
                  </TableCell>
               
                
                </TableRow>
                <TableRow >
                    {
                        header.map((header,i) =>   <React.Fragment key={i}><TableCell align="center" style={{width: i===0 ? '2vw' :''}} >{header}</TableCell></React.Fragment> )
                    }
                </TableRow>
              </TableHead>
              <TableBody>
                {adminCtx?.state?.settings?.data?.map((row, i) => (
                  <TableRow hover key={i}>
                  <TCell row={row} setinView={setinView}/>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        )
      }
      {
        adminCtx.state.loadings.isLoading ? '' : (
          <div className={classes.pagination}>
            <Pagination 
            handleClick={handleClick}
            data={
              {
                current_page:  adminCtx?.state?.settings.current_page,
                prev_page_url:  adminCtx?.state?.settings.prev_page_url,
                next_page_url:  adminCtx?.state?.settings.next_page_url,
                last_page:  adminCtx?.state?.settings.last_page,
              }
            }
            />
          </div>
    
        )
       }
    </>
  );
}
export default SettingDefault;