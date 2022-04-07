import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
    num:{
        padding:'3px 5px',
        borderRadius:'50%',
        margin:'0 2px',
        cursor:'pointer',
        width:'auto'

    },
    arrow:{
        padding:'1px 4px',
        borderRadius:'50%',
        margin:'0 2px',
        border:'1px solid black',
        cursor:'pointer'
    },
    active:{
        background:'#174A84',
        color:'white',
        pointerEvents: 'none',
    },
    sActive:{
        background:'#6FEE90',
        color:'black',
        border:'none !important',
    },
    disabled:{
       background:'lightgrey',
       pointerEvents: 'none',
       opacity:0.2,
       color:'black'
       
    },
  }));

function Pagination({data,border='#174A84',sAdmin=false,handleClick}) {
    const classes = useStyles();

    let lastNum =5;
    let firstNum=1;

    //Number(data.current_page) % 5 <  1

if(data.current_page  <=  5){
 
    lastNum=5;
    firstNum= 1;
}else if(Number(data.current_page) % 5 === 0){
 
    lastNum=Number(data.current_page);
    firstNum= lastNum - 4;
    
}else if((Number(data.current_page) + 1) % 5 === 0){
    lastNum=Number(data.current_page) + 1;
    firstNum= lastNum - 4;
}else if((Number(data.current_page) + 2) % 5 === 0){
    lastNum=Number(data.current_page) + 2;
    firstNum= lastNum - 4;
}else if((Number(data.current_page) + 3) % 5 === 0){
    lastNum=Number(data.current_page) + 3;
    firstNum= lastNum - 4;
}else if((Number(data.current_page) + 4) % 5 === 0){
    lastNum=Number(data.current_page) + 4;
    firstNum= lastNum - 4;
}

    const first =firstNum 
    const second =firstNum + 1
    const third = firstNum + 2
    const fourth =firstNum + 3
    const fifth =lastNum

// if(Number(data.current_page) >= 5){
//      first =Number(data.current_page)
//      second =Number(data.current_page) + 1
//      third =Number(data.current_page) + 2
//      fourth =Number(data.current_page) + 3
//      fifth =Number(data.current_page) + 4
// }
  return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <ArrowBackIosIcon className={clsx(classes.arrow, {[classes.disabled]: !data.prev_page_url})} onClick={() => handleClick(Number(data.current_page) - 1)} />
        <span style={{border:`1px solid ${border}`}}
        onClick={() => handleClick(first)} 
        className={clsx(classes.num, {[classes.active]: data.current_page == first,[classes.sActive]: data.current_page == first && sAdmin,[classes.disabled]: first > data.last_page})}>{first}</span>
        <span style={{border:`1px solid ${border}`}} 
        onClick={() => handleClick(second)} 
        className={clsx(classes.num, {[classes.active]: data.current_page == second,[classes.sActive]: data.current_page == second && sAdmin,[classes.disabled]: second > data.last_page})}>{second}</span>
        <span style={{border:`1px solid ${border}`}} 
        onClick={() => handleClick(third)} 
        className={clsx(classes.num, {[classes.active]: data.current_page == third,[classes.sActive]: data.current_page == third && sAdmin,[classes.disabled]: third > data.last_page})}>{third}</span>
        <span style={{border:`1px solid ${border}`}} 
        onClick={() => handleClick(fourth)} 
        className={clsx(classes.num, {[classes.active]: data.current_page == fourth,[classes.sActive]: data.current_page == fourth && sAdmin,[classes.disabled]: fourth > data.last_page})}>{fourth}</span>
        <span style={{border:`1px solid ${border}`}} 
        onClick={() => handleClick(fifth)} 
        className={clsx(classes.num, {[classes.active]: data.current_page == fifth,[classes.sActive]: data.current_page == fifth && sAdmin,[classes.disabled]: fifth > data.last_page})}>{fifth}</span>
        <ArrowForwardIosIcon  onClick={() => handleClick(Number(data.current_page) + 1)}  className={clsx(classes.arrow, {[classes.disabled]: !data.next_page_url})}/>

       
        </div>
    )
}

export default Pagination;