import { useQuery, UseQueryResult } from "react-query";
import { useRecoilValue } from "recoil";

import { getDateString, getWorkouts } from "../Daily/services";
import { dateState } from "../Daily/states";
import { IWorkout } from "../Daily/types";

export function useWorkouts(): UseQueryResult<IWorkout[], Error> {
  const date = useRecoilValue(dateState);
  return useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
}