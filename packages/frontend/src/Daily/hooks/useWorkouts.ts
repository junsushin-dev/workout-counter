import { useQuery, UseQueryResult } from "react-query";
import { useRecoilValue } from "recoil";

import { getDateString,getWorkouts } from "../services";
import { dateState } from "../states";
import { IWorkout } from "../types";

export function useWorkouts(): UseQueryResult<IWorkout[], Error> {
  const date = useRecoilValue(dateState);
  return useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
}