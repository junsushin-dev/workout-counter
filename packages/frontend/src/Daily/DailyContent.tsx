import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import WorkoutList from "./components/WorkoutList";
import SelectRoutine from './SelectRoutine/RoutineList';
import { DAY_MILLISECS, getDateString,getWorkouts } from "./services";
import { dateState } from "./states";
import { IWorkout } from "./types";

export function DailyContent() {
  const date = useRecoilValue(dateState);
  const workoutQuery = useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchWorkouts = async (date: Date) => {
      await queryClient.prefetchQuery(`workouts/${getDateString(date)}`, () => getWorkouts(date));
    }

    const prevDate = new Date(date.getTime() - DAY_MILLISECS);
    const nextDate = new Date(date.getTime() + DAY_MILLISECS);
    prefetchWorkouts(prevDate);
    prefetchWorkouts(nextDate);
  }, [date, queryClient]);

  if (workoutQuery.isIdle || workoutQuery.isLoading) {
    return <span>loading...</span>;
  }

  if (workoutQuery.isError) {
    return <span>{workoutQuery.error}</span>
  }
  
  return (
    <>
      {workoutQuery.data.length > 0 ? <WorkoutList /> : <SelectRoutine />}
    </>
  )
}