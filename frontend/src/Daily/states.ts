import { atom, selector } from 'recoil';
import { IWorkout } from './types';
import { getWorkouts } from './services';

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

export { dateState, getWorkoutsQuery };