import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

function DateNav() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <IconButton>
        <ChevronLeft />
      </IconButton>
      {date.toLocaleDateString()}
      <IconButton>
        <ChevronRight />
      </IconButton>
    </div>
  )
}

export default DateNav;