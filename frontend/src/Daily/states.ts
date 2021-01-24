import { atom, selector } from 'recoil';
import { getWorkouts } from './services';

const dateState = atom({
  key: 'dateState',
  default: new Date(),
});

const getWorkoutsQuery = selector({
  key: 'currentWorkouts',
  get: async ({get}) => {
    const date = get(dateState);
    const workouts = await getWorkouts(date);
    return workouts;
  },
})

export { dateState, getWorkoutsQuery };