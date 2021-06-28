import { Box, Typography } from '@material-ui/core';
import React, { Suspense } from 'react';

import CenteredProgress from '../common/CenteredProgress';
import DateNav from './components/DateNav';
import { DailyContent } from './DailyContent';

function Daily() {
  const titleText = "Today's Workout";

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <DateNav />
      <Typography>{titleText}</Typography>
      <Box p={2} display="flex" flexDirection="column" height="100%">
        <Suspense fallback={<CenteredProgress />}>
          <DailyContent />
        </Suspense>
      </Box>
    </Box>
  );
}

export default Daily;
