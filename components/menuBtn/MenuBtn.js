import * as React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { AuthContext } from '../../store/auth/AuthStore';

export default function MenuBtn({setmenuTxt,listArr,color='black',background='transparent',menuTxt={plan_name:''}}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authCtx = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnClick = (list) => {
    setAnchorEl(null);
    setmenuTxt(list)
  };


  return ( 
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:color,background:background}}
      >
      {
        menuTxt.japTxt ? (
          <h5 style={{color:color,margin:0,padding:0}}>{authCtx.state.isEnglish ? menuTxt.plan_name : menuTxt.japTxt}</h5>

        ) : (

          <h5 style={{color:color,margin:0,padding:0}}>{menuTxt?.plan_name}</h5>
        )
      }
     
      <ArrowDropDownIcon style={{marginLeft:'0.3vw',marginBottom:'0.2vw',color:color}}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      {
        listArr.map((list,i) => <MenuItem key={i} onClick={() => handleOnClick(list)}>{list.plan_name}</MenuItem>)
      }
        
      </Menu>
    </div>
  );
}
