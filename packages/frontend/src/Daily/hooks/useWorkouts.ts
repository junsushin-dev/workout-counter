import { useRecoilValue } from "recoil";
import { useQuery, UseQueryResult } from "react-query";
import { getWorkouts, getDateString } from "../services";
import { IWorkout } from "../types";
import { dateState } from "../states";

export function useWorkouts(): UseQueryResult<IWorkout[]> {
  const date = useRecoilValue(dateState);
  return useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
}