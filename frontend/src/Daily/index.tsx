import React from 'react';
import { Typography } from '@material-ui/core';
import DateNav from './DateNav';

function Daily() {
  const titleText = "Today's Workout";

  return (
    <div>
      <DateNav />
      <Typography>{titleText}</Typography>
    </div> 
  )
}

export default Daily;