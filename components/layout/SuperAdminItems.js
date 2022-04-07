import React, { useState,useContext, useEffect } from 'react'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Link from 'next/link'
import clsx from 'clsx';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {  List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'

import { useRouter } from 'next/router'
import { AuthContext } from '../../store/auth/AuthStore';
import { isLoggedIn, logout } from '../../store/auth/AuthActions';
import { SuperAdminContext } from '../../store/superAdmin/SuperAdminStore';
import { reset } from '../../store/superAdmin/SuperAdminAction';


export const useStyles = makeStyles((theme) => ({
    listItem : {
      fontSize: '15px',
     
      '&:hover' : {
        background: 'rgba(0,0,0,0.2) !important',
          
        
     },  
    },
  
    selected : {
        background: 'rgba(0,0,0,0.2) !important',
        borderLeft:'7px solid lightgreen'
    },
    txtSelected:{
        color:'lightgreen !important',
    },
  
    listItemText : {
      fontSize: '14px',
      color:'white',
     
    },
    icon: {
      fontSize: '18px',
      color:'white',
    
    },
 

    logo:{
      margin : '0',
      
    },
    img:{
      marginTop : '15px',
      width: '30px',
      height : '20px',
    },
    link: {
        textDecoration : 'none'
    },
    ul: {
        marginTop:'100px'
      },
   
  }));
 
 
function SuperAdminItems({clicked,pc=false}) {
   // const history = useHistory()
   const router = useRouter()
    const classes = useStyles();
    const [select, setselect] = useState(router.pathname);
    const {state,dispatch} = React.useContext(AuthContext);
    const sAdminCtx = React.useContext(SuperAdminContext);
  
    const admin = [
    
        {
            name : 'Dashboard',
            jap : 'ダッシュボード',
            icon : <DashboardIcon  className={clsx(classes.icon, {[classes.txtSelected]: select === '/admin-dashboard'})}/>,
            link : '/admin-dashboard',
            
        },
        {
            name : 'Groups',
            jap : 'グループ',
            icon : <GroupIcon className={clsx(classes.icon, {[classes.txtSelected]: select === '/admin-groups'})} />,
            link : '/admin-groups',
            
        },
     
        {
            name : 'Settings',
            jap : '設定',
            icon : <SettingsIcon className={clsx(classes.icon, {[classes.txtSelected]: select === '/admin-settings'})} />,
            link : '/admin-settings'
        },
    
       
     
    ]
    const handleSelected = (name) => {
        setselect(name);
        sAdminCtx.dispatch(reset())
        if(!pc)clicked();
    }
    const handleLogout = () => {
        dispatch(logout())
        router.push('/login')
    }
  
    return (
        <div className={classes.ul}>
            <List>
                {
                    
                        admin.map((item, index) => ( 
                            <Link 
                                className={classes.link}
                                key={index} 
                                href={item.link}
                                passHref={true}>
                                    <ListItem 
                                        selected={item.link === select}
                                        onClick={() => handleSelected(item.link)} 
                                        
                                        className={clsx(classes.listItem, {
                                            [classes.selected]: item.link === select,
                                          })} 
                                        button 
                                    >
                                        <ListItemIcon >{item.icon}</ListItemIcon>
                                        <ListItemText  classes={{secondary: item.link === select ? classes.txtSelected : classes.listItemText}} secondary={state.isEnglish ?  item.name : item.jap} />
                                    </ListItem>
                                </Link>
                        ))
            }
            </List>
          
            <List>
                
                  <ListItem 
                        onClick={handleLogout}
                        className={classes.listItem} 
                        button 
                        >
                            <ListItemIcon ><ExitToAppIcon className={classes.icon}/></ListItemIcon>
                            <ListItemText classes={{secondary:classes.listItemText}} secondary={state.isEnglish ?  'Logout' : 'ログアウト'} />
                        </ListItem>
            </List>
    </div>
    )
}

export default SuperAdminItems
//