import { useQuery, UseQueryResult } from 'react-query';
import { useRecoilValue } from 'recoil';

import { getWorkouts } from '../apis/workoutsAPI';
import { IWorkout } from '../types';
import { getDateString } from '../utils/getDateString';
import { dateState } from '../views/Daily/states';

export function useWorkouts(): UseQueryResult<IWorkout[], Error> {
  const date = useRecoilValue(dateState);
  return useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
}
