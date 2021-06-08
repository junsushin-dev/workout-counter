import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { getWorkouts } from '../../apis/workoutsAPI';
import { useWorkouts } from '../../hooks/useWorkouts';
import { DAY_MILLISECS, getDateString } from '../../utils/getDateString';
import CenteredProgress from '../common/CenteredProgress';
import { ErrorMessage } from '../common/ErrorMessage';
import WorkoutList from './components/WorkoutList';
import SelectRoutine from './SelectRoutine/RoutineList';
import { dateState } from './states';

export function DailyContent() {
  const date = useRecoilValue(dateState);
  const workoutQuery = useWorkouts();
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchWorkouts = async (date: Date) => {
      await queryClient.prefetchQuery(`workouts/${getDateString(date)}`, () => getWorkouts(date));
    };

    const prevDate = new Date(date.getTime() - DAY_MILLISECS);
    const nextDate = new Date(date.getTime() + DAY_MILLISECS);
    prefetchWorkouts(prevDate);
    prefetchWorkouts(nextDate);
  }, [date, queryClient]);

  if (workoutQuery.isIdle || workoutQuery.isLoading) {
    return <CenteredProgress />;
  }

  if (workoutQuery.isError) {
    return <ErrorMessage message={workoutQuery.error.message} />;
  }

  return <>{workoutQuery.data.length > 0 ? <WorkoutList /> : <SelectRoutine />}</>;
}
