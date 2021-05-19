import { atom, selector } from 'recoil';

import { getRoutines,getWorkouts } from '../apis/workoutsAPI';
import { IRoutine,IWorkout } from './types';

const dateState = atom<Date>({
  key: 'dateState',
  default: new Date(),
});

const getWorkoutsQuery = selector<IWorkout[]>({
  key: 'currentWorkouts',
  get: async ({get}) => {
    const date = get(dateState);
    const workouts = await getWorkouts(date);
    return workouts;
  },
});

const getRoutinesQuery = selector<IRoutine[]>({
  key: 'Routines',
  get: async () => {
    const routines = await getRoutines();
    return routines;
  },
});

export { dateState, getRoutinesQuery,getWorkoutsQuery };