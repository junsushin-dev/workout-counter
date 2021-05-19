import { useQuery, UseQueryResult } from "react-query";
import { useRecoilValue } from "recoil";

import { getWorkouts } from "../apis/workoutsAPI";
import { dateState } from "../Daily/states";
import { IWorkout } from "../Daily/types";
import { getDateString } from '../utils/getDateString';

export function useWorkouts(): UseQueryResult<IWorkout[], Error> {
  const date = useRecoilValue(dateState);
  return useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
}