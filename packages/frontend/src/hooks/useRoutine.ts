import { useQuery, UseQueryResult } from 'react-query';

import { getRoutine } from '../apis/routinesAPI';
import { IRoutine } from '../types';

export function useRoutine(id: number): UseQueryResult<IRoutine, Error> {
  return useQuery<IRoutine, Error>(`routines/${id}`, () => getRoutine(id));
}
