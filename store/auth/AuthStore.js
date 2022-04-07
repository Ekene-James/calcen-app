
import React ,{createContext} from 'react';
import { AuthReducer } from './AuthReducer';

export const AuthContext = createContext();

export default function AuthContextProvider (props){

 const initialState ={
     isAuthenticated : false,
     user: {},
     loading:false,
     chatWindow:false,
     isEnglish:true,
     chattingWith:{},
     isAdmin:false,
     isLoggedIn:false,
     
 };


 const [state, dispatch] = React.useReducer(AuthReducer, initialState);


const value ={
state,
dispatch
}
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}