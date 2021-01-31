import React, { Suspense } from 'react';
import { Box, Typography } from '@material-ui/core';
import DateNav from './components/DateNav';
import WorkoutList from './components/WorkoutList';
import CenteredProgress from '../common/CenteredProgress';

function Daily() {
  const titleText = "Today's Workout";

  return (
    <Box display='flex' flexDirection='column'>
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2}>
        <Suspense fallback={<CenteredProgress />}>
          <WorkoutList />
        </Suspense>
      </Box>
    </Box>
  )
}

export default Daily;
