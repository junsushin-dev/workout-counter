import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

function CenteredProgress() {
  return (
    <Box flex={1} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <CircularProgress size={100}/>
    </Box>
  );
}

export default CenteredProgress;