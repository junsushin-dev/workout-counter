import { AddRoutineDTO, IRoutine } from '../types';
import { customFetch } from '../utils/customFetch';

export const getRoutines = async (): Promise<IRoutine[]> => {
  const routines = await customFetch('/api/routines');

  return routines;
};

export const addRoutine = async (routine: AddRoutineDTO): Promise<IRoutine> => {
  const addedRoutine = await customFetch('/api/routines', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routine),
  });

  return addedRoutine;
};
