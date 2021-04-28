import { Box, Typography } from '@material-ui/core';
import React, { Suspense } from 'react';

import CenteredProgress from '../common/CenteredProgress';
import DateNav from './components/DateNav';
import { DailyContent } from './DailyContent';

function Daily() {
  const titleText = "Today's Workout";

  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Suspense fallback={<CenteredProgress />}>
          <DailyContent />
        </Suspense>
      </Box>
    </Box>
  )
}

export default Daily;
