import { Box, Grid } from '@material-ui/core';
import React from 'react';

import { useRoutines } from '../hooks/useRoutines';
import RoutineItem from './RoutineItem';

function RoutineList() {
  const routinesQuery = useRoutines();
  
  if (routinesQuery.isIdle || routinesQuery.isLoading) {
    return <span>loading...</span>;
  }

  if (routinesQuery.isError) {
    return <span>{routinesQuery.error}</span>
  }

  const routines = routinesQuery.data;

  return (
    <Box>
      <Grid container direction='column' spacing={2}>
        {routines.map((routine) => 
        <Grid item key={routine.id}>
          <RoutineItem routine={routine} />
        </Grid>)}
      </Grid>
    </Box>
  );
}

export default RoutineList;
