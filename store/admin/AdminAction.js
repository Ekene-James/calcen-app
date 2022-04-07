import axios from 'axios'

const success = (state) => {
  return {
    type: 'SUCCESS',
    payload: state
  };
};
export const handleSnackBar = (state) => {
  return {
    type: 'HANDLE_SNACK_BAR',
    payload: state
  };
};
export const reset = () => {
  return {
    type: 'HANDLE_RESET'
  };
};
export const handleLoadings = (state) => {
  return {
    type: 'HANDLE_LOADINGS',
    payload: state
  };
};
export const addEdituser = (state) => {
  return {
    type: 'ADD_EDIT_USER',
    payload: state
  };
};
export const singleSettingItem = (state) => {
  return {
    type: 'SINGLE_SETTING_ITEM',
    payload: state
  };
};


export const editAdminPlan = (state) => {
  return {
    type: 'EDIT_ADMIN_PLAN',
    payload: state
  };
};

export const adminDash = async(dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  try {
    
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/adminDashboard")
   

    dispatch(handleLoadings({
      isLoading:false
    }))

    if(user.data.error){
      console.log(user.data)
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
   
      return dispatch({
        type : 'ADMIN_DASH',
        payload : user.data.data
    })

    }
    } catch (error) {
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:'error'
      }))
        
    }

      
  }

export const listUsers = async(dispatch,pg=1) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
 
  try {
 
    const user = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/listUser?page=${pg}`)

   dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){

      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch({
        type:'LIST_USERS',
        payload:user.data.data
      })

    }

    } catch (error) {
     dispatch(handleLoadings({
      isLoading:false
    }))

        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const listOperators = async(dispatch,pg=1) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
 
  try {
 
    const user = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/listOperator?page=${pg}`)

   dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch({
        type:'LIST_OPERATORS',
        payload:user.data.data
      })

    }

    } catch (error) {
     dispatch(handleLoadings({
      isLoading:false
    }))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }
  }

export const listSettings = async(dispatch,pg=1) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
 
  try {
 
    const user = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/listSetting?page=${pg}`)
  
   dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch({
        type:'LIST_SETTINGS',
        payload:user.data.data
      })

    }

    } catch (error) {
     dispatch(handleLoadings({
      isLoading:false
    }))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }
  }
  export const listAdminUser = async(dispatch,pg=1) => {
    dispatch(handleLoadings({
      isLoading:true
    }))
    try {
   
      const user = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/listStaffUser?page=${pg}`)
   
    
     dispatch(handleLoadings({
        isLoading:false
      }))
      if(user.data.error){
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:user.data.message
        }))
        if(user.data.message === 'Unauthenticated')window.location.replace("/login");
      }else{
        dispatch({
          type:'LIST_ADMIN_USER',
          payload:user.data.data
        })
  
      }
  
      } catch (error) {
       dispatch(handleLoadings({
        isLoading:false
      }))
          console.log(error)
          dispatch(handleSnackBar({
            type:'error',
            open:true,
            msg:'Error'
          }))
          
      }
    }


export const addUser = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({addUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/addUser",data)
    dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({addUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const addOperator = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({addUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/addOperator",data)
    dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({addUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const addSettings = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({addUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/addSetting",data)
    if(user.data.error){
      dispatch(handleLoadings({
        isLoading:false
      }))
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleLoadings({
        isLoading:false
      }))
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({addUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const editSettings = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({editUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/updateSetting",data)
    if(user.data.error){
      dispatch(handleLoadings({
        isLoading:false
      }))
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleLoadings({
        isLoading:false
      }))
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({editUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const addAdminUser = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({addUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/addStaffUser",data)
    dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({addUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const editUser = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({editUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/updateUser",data)
    dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({editUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const editOperator = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({editUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/updateOperator",data)
    dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({editUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const editAdminUser = async(data,dispatch) => {
  dispatch(handleLoadings({
    isLoading:true
  }))
  dispatch(success({editUserSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/updateStaffUser",data)
    dispatch(handleLoadings({
      isLoading:false
    }))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))
      dispatch(success({editUserSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        isLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const getUniqueNumbers = async(dispatch,isExtNum=false) => {

  let externalNum
  dispatch(handleLoadings({
    uniqueIdLoading:true
  }))
  dispatch(success({uniqueIdSuccess:false}))
  try {
    
    const uniqueId = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/getUniqueId")
    if(isExtNum){
      externalNum = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/getExternalNumber")
      
    }else{
      externalNum = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/getExtensionNumber")

    }
   
    dispatch(handleLoadings({
      uniqueIdLoading:false
    }))
    if(uniqueId.data.error || externalNum.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:uniqueId.data.message || externalNum.data.message
      }))
      if(uniqueId.data.message === 'Unauthenticated' || externalNum.data.message === 'Unauthenticated'  )window.location.replace("/login");
    }else{
      dispatch({
        type:'UNIQUE_NUMBERS',
        payload:{
          uniqueId:uniqueId.data.data,
          externalNum:externalNum.data.data
        }
      })
      dispatch(success({uniqueIdSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        uniqueIdLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }

  export const deleteAdminUser = async(id,dispatch) => {
    dispatch(success({addUserSuccess:false}))
    dispatch(handleLoadings({
      deleteLoading:true,
      loadingId:id.id
    }))
    dispatch(success({editUserSuccess:false}))
    try {
   
      const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/deleteStaffUser",id)
      dispatch(handleLoadings({
        deleteLoading:false,
        loadingId:''
      }))
      if(user.data.error){
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:user.data.message
        }))
        if(user.data.message === 'Unauthenticated')window.location.replace("/login");
      }else{
        dispatch(handleSnackBar({
          type:'success',
          open:true,
          msg:user.data.message
        }))
        dispatch(success({editUserSuccess:true}))
      }
  
      } catch (error) {
        dispatch(handleLoadings({
          deleteLoading:false,
          loadingId:''
        }))
          dispatch(handleSnackBar({
            type:'error',
            open:true,
            msg:'Error'
          }))
          
      }
  
        
    }
  export const deleteAdminSetting = async(id,dispatch) => {
    dispatch(success({deleteSettingsSuccess:false}))
  
    dispatch(handleLoadings({
      deleteLoading:true,
      loadingId:id.id
    }))
    try {
   
      const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/deleteSetting",id)
      dispatch(handleLoadings({
        deleteLoading:false,
        loadingId:''
      }))
      if(user.data.error){
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:user.data.message
        }))
        if(user.data.message === 'Unauthenticated')window.location.replace("/login");
      }else{
        dispatch(handleSnackBar({
          type:'success',
          open:true,
          msg:user.data.message
        }))
        dispatch(success({deleteSettingsSuccess:true}))
      }
  
      } catch (error) {
        dispatch(handleLoadings({
          deleteLoading:false,
          loadingId:''
        }))
          dispatch(handleSnackBar({
            type:'error',
            open:true,
            msg:'Error'
          }))
          
      }
  
        
    }
    export const toggleAdminUserStatus = async(data,dispatch) => {
    
      dispatch(handleLoadings({
        switchLoading:true,
      }))

      try {
     
        const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/staffUserStatusUpdate",data)
        dispatch(handleLoadings({
          switchLoading:false,
        }))
        if(user.data.error){
          dispatch(handleSnackBar({
            type:'error',
            open:true,
            msg:user.data.message
          }))
          if(user.data.message === 'Unauthenticated')window.location.replace("/login");
        }else{
          dispatch(handleSnackBar({
            type:'success',
            open:true,
            msg:user.data.message
          }))
    
        }
    
        } catch (error) {
          dispatch(handleLoadings({
            switchLoading:false,
          }))
            dispatch(handleSnackBar({
              type:'error',
              open:true,
              msg:'Error'
            }))
            
        }
    
          
      }

      export const getCallLogs = async(dispatch,isOperator=false,pg=1) => {

        let logs
        dispatch(handleLoadings({
          isLogLoading:true
        }))
      
        try {
          
    
          if(isOperator){
            logs = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/getOperatorCallLogs?page=${pg}`)
            
          }else{
            logs = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/getUserCallLogs?page=${pg}`)
      
          }
      
         
          dispatch(handleLoadings({
            isLogLoading:false
          }))
          if(logs.data.error){
            dispatch(handleSnackBar({
              type:'error',
              open:true,
              msg:logs.data.message
            }))
                 if(logs.data.message === 'Unauthenticated')window.location.replace("/login");
          }else{
            dispatch({
              type:'LIST_LOGS',
              payload:{
                logs:logs.data.data
              }
            })
           
          }
      
          } catch (error) {
            dispatch(handleLoadings({
              isLogLoading:false
            }))
              dispatch(handleSnackBar({
                type:'error',
                open:true,
                msg:'Error'
              }))
              
          }
      
            
        }