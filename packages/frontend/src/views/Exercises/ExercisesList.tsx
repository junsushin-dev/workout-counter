import { Box, Button } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useExercises } from '../../hooks/useExercises';
import CenteredProgress from '../common/CenteredProgress';
import { ErrorMessage } from '../common/ErrorMessage';

export function ExercisesList() {
  const exercisesQuery = useExercises();
  const history = useHistory();

  if (exercisesQuery.isIdle || exercisesQuery.isLoading) {
    return <CenteredProgress />;
  }

  if (exercisesQuery.isError) {
    return <ErrorMessage message={exercisesQuery.error.message} />;
  }

  const exercises = exercisesQuery.data;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'count', headerName: 'Count', width: 100 },
    { field: 'weight', headerName: 'Weight', width: 100 },
  ];

  const handleClick = () => history.push('/exercises/new');

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div style={{ flex: 1, width: '100%' }}>
        <DataGrid rows={exercises} columns={columns} />
      </div>
      <Box padding={2}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add Exercise
        </Button>
      </Box>
    </Box>
  );
}
