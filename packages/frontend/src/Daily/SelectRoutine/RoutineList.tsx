import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { getRoutinesQuery } from '../states';
import RoutineItem from './RoutineItem';

function RoutineList() {
  const routines = useRecoilValue(getRoutinesQuery);
  
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
