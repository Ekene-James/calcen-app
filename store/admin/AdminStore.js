
import React ,{createContext} from 'react';
import { AdminReducer } from './AdminReducer';


export const AdminContext = createContext();

export default function AdminContextProvider (props){
 const initialState ={
    users:{},
    operators:{},
    adminUsers:{},
    editUser:{},
    settings:{},
    logs:{},
    extNum:'',
    uniqueNumbers:{
        uniqueId:'',
        externalNum:''
    },
     singleAdminGroupItem:{},  
     singleAdminPlan:{},  
     singleSettingItem:{},  
     success:{
        addUserSuccess:false,
        editUserSuccess:false,
        uniqueIdSuccess:false,
        deleteSettingsSuccess:false,
         

     },  
     loadings:{
        isLoading:false,
        uniqueIdLoading:false,
        deleteLoading:false,
        switchLoading:false,
        isLogLoading:false,
        loadingId:''

     },  
     adminDash:{
         users:0,
         operators:0,
         call_logs:[]
     },
     plan:[],
 
     snackBarObj:{
         type:'',
         open:false,
         msg:''
     },
     adminGrouptable:{},
     adminPlanSettingsTable:{},
 };
 const [state, dispatch] = React.useReducer(AdminReducer, initialState);


const value ={
state,
dispatch
}
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}