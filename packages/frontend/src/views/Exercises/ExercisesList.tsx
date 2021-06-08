import { Box, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridEditCellPropsParams } from '@material-ui/data-grid';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { editExercise } from '../../apis/exercisesAPI';
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

  const handleEditCellChangeCommited = ({ id, field, props }: GridEditCellPropsParams) => {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const exerciseToEdit = exercises.find((exercise) => exercise.id === id);
    if (!exerciseToEdit) return;
    const editExerciseDTO = { ...exerciseToEdit, [field]: props.value };
    editExercise(editExerciseDTO);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'count', headerName: 'Count', width: 100, editable: true },
    // { field: 'weight', headerName: 'Weight', width: 100, editable: true },
  ];

  const handleClick = () => history.push('/exercises/new');

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div style={{ flex: 1, width: '100%' }}>
        <DataGrid rows={exercises} columns={columns} onEditCellChangeCommitted={handleEditCellChangeCommited} />
      </div>
      <Box padding={2}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add Exercise
        </Button>
      </Box>
    </Box>
  );
}
