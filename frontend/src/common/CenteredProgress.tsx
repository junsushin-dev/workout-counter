import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

function CenteredProgress() {
  const [delayFinished, setDelayFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayFinished(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box pt={5} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      {delayFinished && <CircularProgress size={100}/>}
    </Box>
  );
}

export default CenteredProgress;
