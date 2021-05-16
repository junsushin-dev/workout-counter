import { useQuery, UseQueryResult } from "react-query";

import { IExercise } from "../Daily/types";
import { getExercises } from "../Exercises/services";

export function useExercises(): UseQueryResult<IExercise[], Error> {
  return useQuery<IExercise[], Error>(`exercises`, () => getExercises());
}