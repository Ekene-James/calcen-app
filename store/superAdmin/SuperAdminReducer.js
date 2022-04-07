export const SuperAdminReducer = (state, action) => {
    switch(action.type){
        case "LOADING" : 
        return {
            ...state,
            loading: action.payload
           
          };
          case "HANDLE_RESET" : 
          return {
              ...state,
              success:{
                singleAdminItemSuccess:false,
                editSingleAdminItemSuccess:false,
                deleteSingleAdminItemSuccess:false,
                changeGroupItemStatusSuccess:false,
                addAdminPlanSuccess:false,
                editAdminPlanSuccess:false,
                addAdminGroupSuccess:false,
                uniqueIdSuccess:false,
             },
              uniqueId:'',
            };
        case "IS_ADD_ADMIN_LOADING" : 
        return {
            ...state,
            isAddAdminLoading: action.payload
           
          };
   
        case "EXTERNAL_NUMBER" : 
        return {
            ...state,
            extNum: action.payload
           
          };
        case "UNIQUE_ID" : 
        return {
            ...state,
            uniqueId: action.payload
           
          };
   
        case "SUPER_ADMIN_DASH" : 
        return {
            ...state,
            superAdminDash: action.payload
           
          };
        case "GET_PLAN" : 
        return {
            ...state,
            plan: action.payload
           
          };
        case "HANDLE_SNACK_BAR" : 
        return {
            ...state,
            snackBarObj: action.payload
           
          };
        case "HANDLE_LOADINGS" : 
        return {
            ...state,
            loadings: {
              ...state.loadings,
              ...action.payload
            },
          
           
          };
        case "ADMIN_GROUP_TABLE" : 
        return {
            ...state,
            adminGrouptable: action.payload
           
          };
        case "ADMIN_PLAN_SETTINGS_TABLE" : 
        return {
            ...state,
            adminPlanSettingsTable: action.payload
           
          };
        case "EDIT_ADMIN_PLAN" : 
        return {
            ...state,
            singleAdminPlan: action.payload
           
          };
        case "SINGLE_ADMIN_GROUP_ITEM" : 
        return {
            ...state,
            singleAdminGroupItem: action.payload
           
          };
        case "SUCCESS" : 
        return {
            ...state,
            success: {
              ...state.success,
              ...action.payload
            }
           
          };
       
       
        default : return state
    };

}