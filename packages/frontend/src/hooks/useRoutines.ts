import { useQuery, UseQueryResult } from 'react-query';

import { getRoutines } from '../apis/routinesAPI';
import { IRoutine } from '../types';

export function useRoutines(): UseQueryResult<IRoutine[], Error> {
  return useQuery<IRoutine[], Error>(`routines`, () => getRoutines());
}
