import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import setLanguageHeader from '../utils/setLanguageHeader';

export const setCurrentUser = user => {
    return {
         type: 'LOGIN',
         payload: user
     };
   };
  const isLoading = (state) => {
    return {
      type: 'LOADING',
      payload: state
    };
  };
  export const switchLang = (state) => {
    localStorage.setItem("language",state)
    if(state === true){
      setLanguageHeader('en');
    }else{
      setLanguageHeader('ja');

    }
    return {
        type : 'SWITCH_LANG',
        payload : state
    }
        
    }
  export const isLoggedIn = (state) => {
    return {
        type : 'IS_LOGGED_IN',
        payload : state
    }
        
    }
  export const isAdmin = (state) => {
    return {
        type : 'IS_ADMIN',
        payload : state
    }
        
    }

  export const onReload = (userType,router,dispatch) => {
        const data = localStorage.getItem("user");
        const language = localStorage.getItem("language");
   
        if(!data){
          return router.push('/login')
          }
        const dataMain= JSON.parse(data);
        if(dataMain.role !== userType){
          return router.push('/login')
        }
        setAuthToken(dataMain.token);

        if(language){
          const lang = localStorage.getItem("language");
          let lingua;
          if(lang == 'true'){
            lingua=true
          }else{
            lingua=false  
          }
          dispatch( switchLang(lingua)) 
        }
       
      return  {
          type : 'LOGIN',
          payload:dataMain
         } 

        
    }
 

export const superAdminLogin =async (state,router,dispatch) => {
    dispatch(isLoading(true))
  
    try {
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/superAdminLogin",state)

      localStorage.setItem("user", JSON.stringify({...user.data.data.userDetails,plan:user.data.data.plan}));
      //set token as auth header using axios
      setAuthToken(user.data.data.userDetails.token);
      setLanguageHeader('en');
    
      dispatch(isLoading(false))
        dispatch({
          type : 'LOGIN',
          payload:{...user.data.data.userDetails,plan:user.data.data.plan}
        })  
        
        router.push('/admin-dashboard')

    
    
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('invalid credentials')
    }

    
}
export const normalAdminLogin =async (state,router,dispatch) => {

    dispatch(isLoading(true))
  
    try {
   
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/adminLogin",state)

        localStorage.setItem("user", JSON.stringify(user.data.data.userDetails));
        //set token as auth header using axios

         
          setAuthToken(user.data.data.userDetails.token);
          setLanguageHeader('en');
          dispatch(isLoading(false))
        
         dispatch({
          type : 'LOGIN',
          payload:user.data.data.userDetails
         })  
         router.push('/dashboard')

      
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('invalid credentials')
    }

    
}
export const logout = async()  => {
  localStorage.removeItem("language")
  setLanguageHeader('en');
    try {
      
      const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/logOut")
        //clear local storage
        localStorage.removeItem("user");
        //clear authHeader
        setAuthToken(false);
        //reset state to its initial value (i.e isAuthenticated :false, and user: {} ), by dispatchin an empty obj as parameter to store via setcurrentUser func as dis wud return empty obj in 'isEmpty()',wic mks isAuthenticated(false) nd "user : {}"
      
        
    } catch (error) {
        console.error(error)
    }
        
  };


