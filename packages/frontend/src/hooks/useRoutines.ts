import { useQuery, UseQueryResult } from "react-query";

import { getRoutines } from "../apis/workoutsAPI";
import { IRoutine } from "../Daily/types";

export function useRoutines(): UseQueryResult<IRoutine[], Error> {
  return useQuery<IRoutine[], Error>(`routines`, () => getRoutines());
}