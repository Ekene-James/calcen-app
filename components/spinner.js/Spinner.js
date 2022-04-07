import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Spinner({style={},size=40}) {
  return <div style={{...style,display:'flex',justifyContent:'center',alignItems:'center'}}><CircularProgress size={size} /></div>;
}

export default Spinner;
