import { Box, Button } from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridEditCellPropsParams,
  GridRowId,
  GridSelectionModelChangeParams,
} from '@material-ui/data-grid';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { deleteExercises, editExercise } from '../../apis/exercisesAPI';
import { useExercises } from '../../hooks/useExercises';
import CenteredProgress from '../common/CenteredProgress';
import { ErrorMessage } from '../common/ErrorMessage';

export function ExercisesList() {
  const queryClient = useQueryClient();
  const exercisesQuery = useExercises();
  const history = useHistory();
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const mutation = useMutation(deleteExercises, {
    onSuccess: () => {
      queryClient.invalidateQueries('exercises');
      setSelectionModel([]);
    },
  });

  if (exercisesQuery.isIdle || exercisesQuery.isLoading || mutation.isLoading) {
    return <CenteredProgress />;
  }

  if (exercisesQuery.isError) {
    return <ErrorMessage message={exercisesQuery.error.message} />;
  }

  if (mutation.isError && mutation.error instanceof Error) {
    return <ErrorMessage message={mutation.error.message} />;
  }

  const exercises = exercisesQuery.data;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'count', headerName: 'Count', width: 100, editable: true },
    // { field: 'weight', headerName: 'Weight', width: 100, editable: true },
  ];

  const handleEditCellChangeCommited = ({ id, field, props }: GridEditCellPropsParams) => {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const exerciseToEdit = exercises.find((exercise) => exercise.id === id);
    if (!exerciseToEdit) return;
    const editExerciseDTO = { ...exerciseToEdit, [field]: props.value };
    editExercise(editExerciseDTO);
  };

  const handleSelectionModelChange = (newSelection: GridSelectionModelChangeParams) => {
    setSelectionModel(newSelection.selectionModel);
  };

  const handleDeleteButtonClick = () => {
    mutation.mutate(selectionModel);
  };

  const handleAddButtonClick = () => history.push('/exercises/new');

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div style={{ flex: 1, width: '100%' }}>
        <DataGrid
          rows={exercises}
          columns={columns}
          onEditCellChangeCommitted={handleEditCellChangeCommited}
          onSelectionModelChange={handleSelectionModelChange}
          checkboxSelection
        />
      </div>
      <Box padding={2}>
        {selectionModel.length > 0 ? (
          <Button variant="contained" color="secondary" onClick={handleDeleteButtonClick}>
            Delete Exercise
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
            Add Exercise
          </Button>
        )}
      </Box>
    </Box>
  );
}
