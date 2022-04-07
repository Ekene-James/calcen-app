import React,{useContext} from 'react';
import { useRouter } from 'next/router'

import { makeStyles,Paper , Button,TextField,  } from '@material-ui/core';

import TextInput from '../components/textInput/TextInput';
import { AuthContext } from '../store/auth/AuthStore';
import { isAdmin, isLoggedIn, normalAdminLogin, superAdminLogin } from '../store/auth/AuthActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        width : '350px',
        height : '500px',
        margin : ' 100px auto',
        display : 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection : 'column',
      
        [theme.breakpoints.down("sm")]: {
            margin : ' 150px auto',
            width: `80%`
        }
       
       },
    form: {
        margin : '15px 0',
       
       },
    signUp: {
        display : 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width:'50%'
       
       },
       txtField: {
        marginTop : '25px',
       
       },
    link: {
        marginBottom : '30px',
       
       },
       bg: {
        height : '100vh',
        background: `url("./loginBg.jpg") no-repeat center center/cover`,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
         
    },
   }));
function Login() {
    const classes = useStyles();
      const router = useRouter()
    const authCtx = React.useContext(AuthContext);
    const [state, setstate] = React.useState({
        email:'',
        password : '',
    })
    React.useEffect(() => {
        if(localStorage.getItem("user")) localStorage.removeItem("user");
      
      },[])
  const onLogin = e => {
      e.preventDefault();
      
      const data ={
        email:'abc@gmail.com',
        password:'1234567'
      }
      authCtx.dispatch(normalAdminLogin(state,router,authCtx.dispatch))
     
  
  }
  const onAdminLogin = e => {
      e.preventDefault();
      const data ={
        email:'admin@calcen.com',
        password:'admin'
      }
      authCtx.dispatch(superAdminLogin(state,router,authCtx.dispatch))
    //   authCtx.dispatch(isLoggedIn(true))
    //   authCtx.dispatch(isAdmin(true))
    //   router.push('/admin-dashboard')
  
  }
 
  
      const handleChange = e => {
        const {name,value} = e.target
         setstate({
             ...state,
            [name] : value
        })
        
    }
    return (
        <div className={classes.bg}>
            <Paper className={classes.paper}>
                <div className={classes.txtField}>
                        <TextInput
                        value={state.email}
                        name='email'
                        handleChange={handleChange}  
                        engLabel='Email'
                        style={{margin:'10px 0'}}
                        
                    />
                    <TextInput
                    value={state.password}
                    name='password'
                    handleChange={handleChange}  
                    engLabel='Password'
                    type={'password'}
                    style={{margin:'10px 0'}}
                    />
              
                 <Button fullWidth variant="contained" color="primary" style={{marginBottom:'10px'}} onClick={onLogin} disabled={authCtx.state.loading} >
                   Login
                </Button>
                <Button fullWidth variant="contained" color="secondary" onClick={onAdminLogin} disabled={authCtx.state.loading} >
                   Super Admin Login
                </Button>
               
                </div>
               
            </Paper>
        </div>
    )
}
Login.layout = "L1";
export default Login
