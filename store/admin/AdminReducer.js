export const AdminReducer = (state, action) => {
    switch(action.type){
 
   
        case "ADMIN_DASH" : 
        return {
            ...state,
            adminDash: action.payload
           
          };
        case "HANDLE_RESET" : 
        return {
            ...state,
            success:{
              addUserSuccess:false,
              editUserSuccess:false,
              uniqueIdSuccess:false,
              deleteSettingsSuccess:false,
           },
           uniqueNumbers:{
            uniqueId:'',
            externalNum:''
        },
           
          };
        case "LIST_USERS" : 
        return {
            ...state,
            users: action.payload
           
          };
        case "LIST_LOGS" : 
        return {
            ...state,
            logs: action.payload
           
          };
        case "EXT_NUMBER" : 
        return {
            ...state,
            extNum: action.payload
           
          };
        case "LIST_ADMIN_USER" : 
        return {
            ...state,
            adminUsers: action.payload
           
          };
        case "LIST_SETTINGS" : 
        return {
            ...state,
            settings: action.payload
           
          };
        case "LIST_OPERATORS" : 
        return {
            ...state,
            operators: action.payload
           
          };
        case "ADD_EDIT_USER" : 
        return {
            ...state,
            editUser: action.payload
           
          };
        case "UNIQUE_NUMBERS" : 
        return {
            ...state,
            uniqueNumbers: action.payload
           
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
        case "SINGLE_SETTING_ITEM" : 
        return {
            ...state,
            singleSettingItem: action.payload
           
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