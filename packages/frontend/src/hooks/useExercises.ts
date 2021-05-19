import { useQuery, UseQueryResult } from "react-query";

import { getExercises } from "../apis/exercisesAPI";
import { IExercise } from "../types";

export function useExercises(): UseQueryResult<IExercise[], Error> {
  return useQuery<IExercise[], Error>(`exercises`, () => getExercises());
}