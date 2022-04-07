import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({type,msg,open,setOpen,autoHide=true}) {
  const classes = useStyles();
  

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
     
      <Snackbar open={open} autoHideDuration={autoHide ? 6000 : null} onClose={handleClose}>
        <Alert onClose={() => setOpen(false)} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
