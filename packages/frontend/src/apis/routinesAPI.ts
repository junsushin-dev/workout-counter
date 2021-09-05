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
