import { Box, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import React, { useEffect,useState } from 'react';

import { getExercises } from './services';

export function ExercisesTab() {
  const [exercises, setExercises] = useState<GridRowsProp>([]);

  useEffect(() => {
    (async () => {
      const fetchedExercises = await getExercises();
      setExercises(fetchedExercises);
    })();
  }, []);

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