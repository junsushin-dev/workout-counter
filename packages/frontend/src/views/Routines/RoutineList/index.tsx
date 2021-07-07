import { Grid } from '@material-ui/core';
import React from 'react';

import { useRoutines } from '../../../hooks/useRoutines';
import CenteredProgress from '../../common/CenteredProgress';
import { ErrorMessage } from '../../common/ErrorMessage';
import RoutineItem from './RoutineItem';

export function RoutineList() {
  const routinesQuery = useRoutines();

  if (routinesQuery.isIdle || routinesQuery.isLoading) {
    return <CenteredProgress />;
  }

  if (routinesQuery.isError) {
    return <ErrorMessage message={routinesQuery.error.message} />;
  }

  const routines = routinesQuery.data;

  return (
    <Grid container direction="column" spacing={2}>
      {routines.map((routine) => (
        <Grid item key={routine.id}>
          <RoutineItem routine={routine} onClick={() => {}} />
        </Grid>
      ))}
    </Grid>
  );
}
