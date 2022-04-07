import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { AuthContext } from '../../store/auth/AuthStore';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function SettingsCheckBox({state,handleChangeDay}) {
    const authCtx = React.useContext(AuthContext);
 

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.mon} onChange={handleChangeDay}  color="primary" name="mon" />}
        label={authCtx.state.isEnglish ?  'Mon' : '月'}
      />
      <FormControlLabel
        control={<Checkbox checked={state.tue} onChange={handleChangeDay}  color="primary" name="tue" />}
        label={authCtx.state.isEnglish ?  'Tue' : '火'}
      />
      <FormControlLabel
        control={<Checkbox checked={state.wed} onChange={handleChangeDay}  color="primary" name="wed" />}
        label={authCtx.state.isEnglish ?  'Weds' : '水'}
      />
      <FormControlLabel
        control={<Checkbox checked={state.thu} onChange={handleChangeDay}  color="primary" name="thu" />}
        label={authCtx.state.isEnglish ?  'Thurs' : '木'}
      />
      <FormControlLabel
        control={<Checkbox checked={state.fri} onChange={handleChangeDay}  color="primary" name="fri" />}
        label={authCtx.state.isEnglish ?  'Fri' : '金'}
      />
      <FormControlLabel
      color="primary"
        control={<Checkbox checked={state.sat} onChange={handleChangeDay}  color="primary" name="sat" />}
        label={authCtx.state.isEnglish ?  'Sat' : '土'}
      />
      <FormControlLabel
        control={<Checkbox checked={state.sun} onChange={handleChangeDay}  color="primary" name="sun" />}
        label={authCtx.state.isEnglish ?  'Sun' : '日'}
      />
      
    </FormGroup>
  );
}
