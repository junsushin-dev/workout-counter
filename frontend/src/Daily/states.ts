import { atom, selector } from 'recoil';
import { IWorkout, IRoutine } from './types';
import { getWorkouts, getRoutines } from './services';

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
  get: async ({get}) => {
    const date = get(dateState);
    const routines = await getRoutines(date);
    return routines;
  },
});

export { dateState, getWorkoutsQuery, getRoutinesQuery };