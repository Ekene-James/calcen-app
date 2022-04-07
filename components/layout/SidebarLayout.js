import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import clsx from 'clsx';
import TopBar from './TopBar'
import {  makeStyles, useTheme } from '@material-ui/core/styles';


import SidebarItems from './SidebarItems';
import { AuthContext } from '../../store/auth/AuthStore';


const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
    [theme.breakpoints.down('sm')]: {
      overflowX : 'hidden'
    },
    
   },
   top : {
    overflow : 'hidden'
   },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow : 'none'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
   backgroundColor : '#174A84'
  },
  drawerPaperAdmin: {
    width: drawerWidth,
   backgroundColor : '#178456'
  },
  content: {
    flexGrow: 1,
 
    padding: theme.spacing(3),
    
  },
  dHead: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
    [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  icon: {
   color:'white',
   
  },
 

}));


function SidebarLayout(props) {
  const {state,dispatch} = React.useContext(AuthContext);
  const { window,children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handlePcDrawerToggle = () => {
    setOpen(!open);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
   
   
    <div className={classes.root}>
      <CssBaseline />
   { <TopBar handleDrawerToggle={handleDrawerToggle} open={open} handlePcDrawerToggle={handlePcDrawerToggle}/>
}
   
      <nav  aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
         
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
         
            <SidebarItems clicked={handleDrawerToggle}/>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
        
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          >
            <SidebarItems clicked={handlePcDrawerToggle} pc={true}/>
          </Drawer>
        </Hidden>
      </nav>
      <main className={clsx(classes.content, {
        [classes.contentShift]: !open,
      })}
      >
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
   
  );
}



export default SidebarLayout;
