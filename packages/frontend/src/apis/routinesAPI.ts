import { AddRoutineDTO, IRoutine } from '../types';
import { customFetch } from '../utils/customFetch';

export const getRoutines = async (): Promise<IRoutine[]> => {
  const routines = await customFetch('/api/routines');

  return routines;
};

export const getRoutine = async (id: number): Promise<IRoutine> => {
  const routine = await customFetch(`/api/routines/${id}`);

  return routine;
};

export const addRoutine = async (routine: AddRoutineDTO): Promise<IRoutine> => {
  const addedRoutine = await customFetch('/api/routines', {
    method: 'POST',
    body: JSON.stringify(routine),
  });

  return addedRoutine;
};

export const addExerciseToRoutine = async (routineId: number, exerciseId: number, order: number) => {
  const addExerciseToRoutineDTO = { exerciseId, order };
  const routine = await customFetch(`/api/routines/${routineId}/exercises`, {
    method: 'POST',
    body: JSON.stringify(addExerciseToRoutineDTO),
  });

  return routine;
};

export const updateExerciseOrderInRoutine = async (routineId: number, exerciseId: number, order: number) => {
  const routine = await customFetch(`/api/routines/${routineId}/exercises/${exerciseId}`, {
    method: 'PATCH',
    body: JSON.stringify({ order }),
  });

  return routine;
};

export const removeExerciseFromRoutine = async (routineId: number, exerciseId: number) => {
  const routine = await customFetch(`/api/routines/${routineId}/exercises/${exerciseId}`, {
    method: 'DELETE',
  });

  return routine;
};
