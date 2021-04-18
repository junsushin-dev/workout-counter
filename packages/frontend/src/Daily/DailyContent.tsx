import React from 'react';
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import WorkoutList from "./components/WorkoutList";
import SelectRoutine from './SelectRoutine/RoutineList';
import { getWorkouts, getDateString } from "./services";
import { dateState } from "./states";
import { IWorkout } from "./types";

export function DailyContent() {
  const date = useRecoilValue(dateState);
  const workoutQuery = useQuery<IWorkout[], Error>(`workouts/${getDateString(date)}`, () => getWorkouts(date));

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