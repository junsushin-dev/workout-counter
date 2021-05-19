import { useQuery, UseQueryResult } from "react-query";

import { getExercises } from "../apis/exercisesAPI";
import { IExercise } from "../Daily/types";

export function useExercises(): UseQueryResult<IExercise[], Error> {
  return useQuery<IExercise[], Error>(`exercises`, () => getExercises());
}