import React from 'react';
import {switchLang} from '../../store/auth/AuthActions'
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography,Switch } from '@material-ui/core'
import { AuthContext } from '../../store/auth/AuthStore';
const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: 'rgba(23,74,132,0.5)',
          
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
      background:'#174A84'
    },
    track: {
      border: `1px solid #174A84`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
export default function CustomSwitch() {
  const authCtx = React.useContext(AuthContext);
    const [checked, setchecked] = React.useState(!authCtx.state.isEnglish);
    React.useEffect(() => {
      setchecked(!authCtx.state.isEnglish)
    }, [authCtx.state.isEnglish])
    
    const handleChecked = (event) => {
      //  setchecked(event.target.checked)
        authCtx.dispatch(switchLang(!event.target.checked))
        
      };
  return (
    <Typography component="div">
    <Grid component="label" container alignItems="center" spacing={1}>
    <Grid item><h5 style={{color:'#174A84'}}>Eng</h5></Grid>
    <Grid item>
        <AntSwitch checked={checked} onChange={handleChecked} name="checked" />
    </Grid>
    <Grid item><h5 style={{color:'#174A84'}}>Jap</h5></Grid>
    </Grid>
</Typography>
  );
}
