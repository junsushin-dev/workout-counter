import { Box, Button } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React from 'react';

import { useExercises } from '../hooks/useExercises';

export function ExercisesTab() {
  const exercisesQuery = useExercises();

  if (exercisesQuery.isIdle || exercisesQuery.isLoading) {
    return <span>loading...</span>;
  }

  if (exercisesQuery.isError) {
    return <span>{exercisesQuery.error}</span>
  }

  const exercises = exercisesQuery.data;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'count', headerName: 'Count', width: 100 },
    { field: 'weight', headerName: 'Weight', width: 100 },
  ];
  
  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <div style={{ flex: 1, width: '100%' }}>
        <DataGrid rows={exercises} columns={columns} />
      </div>
      <Box padding={2}>
        <Button variant='contained' color='primary'>Add Exercise</Button>
      </Box>
    </Box>
  )
}