import React,{useContext} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {  makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';
import MenuBtn from '../menuBtn/MenuBtn'
import { AppBar, Avatar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import CustomSwitch from '../switch/Switch';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  
    [theme.breakpoints.down('sm')]: {
      overflowX : 'hidden'
    },
    
   },

  appBar: {
    boxShadow: '-1px 7px 16px 3px rgba(23,74,132,0.33)',
    WebkitBoxShadow: '-1px 7px 16px 3px rgba(23,74,132,0.33)',
    mozBoxShadow: '-1px 7px 16px 3px rgba(23,74,132,0.33)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
   
  },
  notOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0 !important',
      width:'100% !important'
    },
    
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  date : {
    fontSize : '10px',
    color: 'gray'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor : 'rgb(234,234,234)'
  },
  

  icon: {
    fontSize: '15px'
  },
  iconBtn :{
   border : '1px solid #174A84',
   width : '38px',
   height : '38px',
   background: 'transparent',
   marginLeft : '0.5vw',
   alignSelf: 'center'

  },
  ntnBtn : {
    width : '38px',
   height : '38px',
   background: '#e8e8e8',
   marginRight : '0.5vw',
   alignSelf: 'center'
  },
  logo:{
    marginTop : '15px'
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  icn: {
  color:'#174A84'
  },
  icnBtn: {
    marginRight:'0.5vw',
    marginLeft:'-1.8vw',
    boxShadow: '-1px 7px 16px 3px rgba(23,74,132,0.11)',
    WebkitBoxShadow: '-1px 7px 16px 3px rgba(23,74,132,0.11)',
    mozBoxShadow: '-1px 7px 16px 3px rgba(23,74,132,0.11)',
    width : '2vw',
    height : '2vw',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
 
 

}));

function TopBar({handleDrawerToggle,open,handlePcDrawerToggle}) {
 
    const classes = useStyles();
    const theme = useTheme();
    // const header = state?.route?.match(/([a-z])\w+/g);
    // const capitalize = String(header).replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
    const [menuTxt, setmenuTxt] = React.useState({
      engTxt:'Sacremento PA',
      japTxt:'権限を選択'  
    });
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
//   const listArr =[
//     {
//         engTxt:'Operator Response',
//         japTxt:'コンシェルジュ応答'  
//     },
//     {
//         engTxt:'answering machine (with voice message)',
//         japTxt:'留守番電話（音声メッセージ付き）'  
//     },
//     {
//         engTxt:'answering machine (without voice message)',
//         japTxt:'留守番電話（音声メッセージなし）'  
//     },
//  ]
    return (
        <div>
        <AppBar position='absolute' color='transparent' className={clsx(classes.appBar, {[classes.notOpen]: !open})}>
     
        
        <Toolbar>
        <IconButton className={classes.icnBtn}  onClick={handlePcDrawerToggle}>
          <ChevronLeftIcon className={classes.icn}/> 
        </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        
          <CustomSwitch/>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
   
           
          </div>
       
        </Toolbar>
      </AppBar>
      {
       // renderMobileMenu
      }
    </div>
    )
}

export default TopBar
