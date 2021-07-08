import { Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useRoutines } from '../../../hooks/useRoutines';
import CenteredProgress from '../../common/CenteredProgress';
import { ErrorMessage } from '../../common/ErrorMessage';
import RoutineItem from './RoutineItem';

export function RoutineList() {
  const routinesQuery = useRoutines();
  const history = useHistory();

  if (routinesQuery.isIdle || routinesQuery.isLoading) {
    return <CenteredProgress />;
  }

  if (routinesQuery.isError) {
    return <ErrorMessage message={routinesQuery.error.message} />;
  }

  const routines = routinesQuery.data;

  const handleClick = (id: number) => {
    history.push(`/routines/${id}`);
  };

  return (
    <Grid container direction="column" spacing={2}>
      {routines.map((routine) => (
        <Grid item key={routine.id}>
          <RoutineItem routine={routine} onClick={() => handleClick(routine.id)} />
        </Grid>
      ))}
    </Grid>
  );
}
