import React from 'react';

import {  makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../store/auth/AuthStore';


export default function CustomTxt({engTxt,japTxt='',type,color='black',style={}}) {
    const {state} = React.useContext(AuthContext);
   
 
    let Txt=null;
   switch (type) {
       case 'h1':
          Txt= (<h1 style={{color:color,...style}} >{state.isEnglish ?  engTxt : japTxt}</h1>)
           break;
       case 'h2':
          Txt= (<h2 style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</h2>)
           break;
       case 'h3':
          Txt= (<h3 style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</h3>)
           break;
       case 'h4':
          Txt= (<h4 style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</h4>)
           break;
       case 'h5':
          Txt= (<h5 style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</h5>)
           break;
       case 'h6':
          Txt= (<h6 style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</h6>)
           break;
       case 'p':
          Txt= (<p style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</p>)
           break;
       case 'small':
          Txt= (<small style={{color:color,...style}}>{state.isEnglish ?  engTxt : japTxt}</small>)
           break;
   
       default:
           break;
   }
  return (
      <>
      {Txt}
      </>
  );
}
