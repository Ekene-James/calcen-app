
import React ,{createContext} from 'react';
import { SuperAdminReducer } from './SuperAdminReducer';


export const SuperAdminContext = createContext();

export default function SuperAdminContextProvider (props){
 const initialState ={
    
     loading:false,  
     isAddAdminLoading:false,  
     singleAdminGroupItem:{},  
     singleAdminPlan:{},  
     extNum:'',  
     uniqueId:'',
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
     loadings:{
        toggleActiveLoading:false,
        getUniqueIdLoading:false,

     },  
     superAdminDash:{
         group:0,
         operators:0
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
 const [state, dispatch] = React.useReducer(SuperAdminReducer, initialState);


const value ={
state,
dispatch
}
    return (
        <SuperAdminContext.Provider value={value}>
            {props.children}
        </SuperAdminContext.Provider>
    )
}