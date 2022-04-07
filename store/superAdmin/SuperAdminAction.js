import axios from 'axios'
const isLoading = (state) => {
  return {
    type: 'LOADING',
    payload: state
  };
};
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
export const handleLoadings = (state) => {
  return {
    type: 'HANDLE_LOADINGS',
    payload: state
  };
};

const isAddAdminLoading = (state) => {
  return {
    type: 'IS_ADD_ADMIN_LOADING',
    payload: state
  };
};
export const editAdminPlan = (state) => {
  return {
    type: 'EDIT_ADMIN_PLAN',
    payload: state
  };
};
export const reset = () => {
  return {
    type: 'HANDLE_RESET'
  };
};
export const superAdminDash = async(dispatch) => {
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/superAdminDashboard")

    if(user.data.message === 'Unauthenticated')window.location.replace("/login");
        return dispatch({
          type : 'SUPER_ADMIN_DASH',
          payload : user.data.data
      })
    } catch (error) {
        console.log(error)
        
    }

      
  }
export const addAdmin = async(data,dispatch) => {
  dispatch(isAddAdminLoading(true))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/addAdminGroup",data)

    dispatch(isAddAdminLoading(false))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(success({addAdminGroupSuccess:true}))
      dispatch(handleSnackBar({
        type:'success',
        open:true,
        msg:user.data.message
      }))

    }

    } catch (error) {
      dispatch(isAddAdminLoading(false))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const listAdminGroup = async(dispatch,pg=1) => {
  dispatch(isLoading(true))
 
  try {
   const externalNum = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/getExternalNumber")
    const user = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/listAdminGroup?page=${pg}`)
    
    dispatch(isLoading(false))
  
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated' || externalNum.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch({
        type:'ADMIN_GROUP_TABLE',
        payload:user.data.data
      })
      dispatch({
        type:'EXTERNAL_NUMBER',
        payload:externalNum.data.data
      })

    }

    } catch (error) {
      dispatch(isLoading(false))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const getSingleAdminGroup = async(id,dispatch) => {
  dispatch(isLoading(true))
  dispatch(success({singleAdminItemSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/getAdminGroup",id)
 
    dispatch(isLoading(false))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{

      dispatch({
        type:'SINGLE_ADMIN_GROUP_ITEM',
        payload:user.data.data
      })
      dispatch(success({singleAdminItemSuccess:true}))
    }

    } catch (error) {
      dispatch(isLoading(false))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const editSingleAdminGroup = async(id,dispatch) => {
  dispatch(isLoading(true))
  dispatch(success({editSingleAdminItemSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/updateAdminGroup",id)

    dispatch(isLoading(false))
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
      dispatch(success({editSingleAdminItemSuccess:true}))
    }

    } catch (error) {
      dispatch(isLoading(false))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const deletSingleAdminGroup = async(ids,dispatch) => {
  dispatch(isLoading(true))

  dispatch(success({deleteSingleAdminItemSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/deleteAdminGroup",ids)

    dispatch(isLoading(false))
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
      dispatch(success({deleteSingleAdminItemSuccess:true}))
    }

    } catch (error) {
      dispatch(isLoading(false))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const changeGroupStatus = async(data,dispatch) => {

  dispatch(handleLoadings({
    toggleActiveLoading:true
  }))

 // dispatch(success({changeGroupItemStatusSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/groupStatusUpdate",data)
    dispatch(handleLoadings({
      toggleActiveLoading:false
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
      //dispatch(success({changeGroupItemStatusSuccess:true}))
    }

    } catch (error) {
      dispatch(handleLoadings({
        toggleActiveLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const getUniqueID = async(dispatch) => {

  dispatch(handleLoadings({
    getUniqueIdLoading:true
  }))

dispatch(success({uniqueIdSuccess:false}))
  try {
 
    const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/getUniqueId")
    if(user.data.error){
      dispatch(handleLoadings({
        getUniqueIdLoading:false
      }))
 
     
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch(handleLoadings({
        getUniqueIdLoading:false
      }))
 
      dispatch({
        type:'UNIQUE_ID',
        payload:user.data.data
      })
     
      dispatch(success({uniqueIdSuccess:true}))
    }
    } catch (error) {
      dispatch(handleLoadings({
        getUniqueIdLoading:false
      }))
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
export const getAdminPlanSettings = async(dispatch,pg=1) => {
  dispatch(isLoading(true))


  try {
 
    const user = await axios.post(`https://pbx24by7.com/Calcen/Backend/public/api/listAdminPlan?${pg}`)

    dispatch(isLoading(false))
    if(user.data.error){
      dispatch(handleSnackBar({
        type:'error',
        open:true,
        msg:user.data.message
      }))
      if(user.data.message === 'Unauthenticated')window.location.replace("/login");
    }else{
      dispatch({
        type:'ADMIN_PLAN_SETTINGS_TABLE',
        payload:user.data.data
      })
   
    }

    } catch (error) {
      dispatch(isLoading(false))
        console.log(error)
        dispatch(handleSnackBar({
          type:'error',
          open:true,
          msg:'Error'
        }))
        
    }

      
  }
  export const changeGroupSettingsStatus = async(data,dispatch) => {
    dispatch(handleLoadings({
      toggleActiveLoading:true
    }))
  
    dispatch(success({changeGroupItemStatusSuccess:false}))
    try {
   
      const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/planStatusUpdate",data)
  
    dispatch(handleLoadings({
      toggleActiveLoading:false
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
      toggleActiveLoading:false
    }))
          console.log(error)
          dispatch(handleSnackBar({
            type:'error',
            open:true,
            msg:'Error'
          }))
          
      }
  
        
    }
    export const addAdminPlan = async(data,dispatch) => {
      dispatch(isLoading(true))
      dispatch(success({addAdminPlanSuccess:false}))
      try {
     
        const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/addAdminPlan",data)
    
        dispatch(isLoading(false))
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
          dispatch(success({addAdminPlanSuccess:true}))
    
        }
    
        } catch (error) {
          dispatch(isLoading(false))
            console.log(error)
            dispatch(handleSnackBar({
              type:'error',
              open:true,
              msg:'Error'
            }))
            
        }
    
          
      }

      export const postEditAdminPlan = async(data,dispatch) => {
        dispatch(isLoading(true))
        dispatch(success({editAdminPlanSuccess:false}))
        try {
       
          const user = await axios.post("https://pbx24by7.com/Calcen/Backend/public/api/updateAdminPlan",data)
      console.log(user)
          dispatch(isLoading(false))
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
            dispatch(success({editAdminPlanSuccess:true}))
          }
      
          } catch (error) {
            dispatch(isLoading(false))
              console.log(error)
              dispatch(handleSnackBar({
                type:'error',
                open:true,
                msg:'Error'
              }))
              
          }
      
            
        }
        