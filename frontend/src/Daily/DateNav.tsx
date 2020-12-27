import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const DAY_MILLISEC = 1000 * 60 * 60 * 24;

function DateNav() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (dayOffset: number) => {
    setDate(prevDate => new Date(prevDate.getTime() + dayOffset * DAY_MILLISEC));
  }

  return (
    <div>
      <IconButton onClick={() => handleDateChange(-1)}>
        <ChevronLeft />
      </IconButton>
      {date.toLocaleDateString()}
      <IconButton onClick={() =>handleDateChange(+1)}>
        <ChevronRight />
      </IconButton>
    </div>
  )
}

export default DateNav;