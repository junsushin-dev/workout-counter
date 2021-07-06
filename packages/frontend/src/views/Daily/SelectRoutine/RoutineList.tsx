import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { createWorkoutsByRoutine } from '../../../apis/workoutsAPI';
import { useRoutines } from '../../../hooks/useRoutines';
import { IRoutine } from '../../../types';
import { getDateString } from '../../../utils/getDateString';
import CenteredProgress from '../../common/CenteredProgress';
import { ErrorMessage } from '../../common/ErrorMessage';
import { dateState } from '../states';
import RoutineItem from './RoutineItem';

function RoutineList() {
  const routinesQuery = useRoutines();
  const queryClient = useQueryClient();
  const date = useRecoilValue(dateState);

  const handleClick = (routine: IRoutine) => async () => {
    await createWorkoutsByRoutine(date, routine);
    queryClient.invalidateQueries(`workouts/${getDateString(date)}`);
  };

  if (routinesQuery.isIdle || routinesQuery.isLoading) {
    return <CenteredProgress />;
  }

  if (routinesQuery.isError) {
    return <ErrorMessage message={routinesQuery.error.message} />;
  }

  const routines = routinesQuery.data;

  return (
    <Box>
      <Grid container direction="column" spacing={2}>
        {routines.map((routine) => (
          <Grid item key={routine.id}>
            <RoutineItem routine={routine} onClick={handleClick(routine)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RoutineList;
