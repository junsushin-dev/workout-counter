import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { RoutineForm } from './RoutineForm';

export function AddRoutinePage() {
  return (
    <Box display="flex" flexDirection="column" height="100%" padding={4}>
      <Box paddingBottom={4}>
        <Typography variant="h5" component="h1">
          CREATE A NEW ROUTINE
        </Typography>
      </Box>
      <RoutineForm />
    </Box>
  );
}
