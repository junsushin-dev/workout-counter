import { useRecoilValue } from "recoil";
import WorkoutList from "./components/WorkoutList";
import SelectRoutine from './SelectRoutine/RoutineList';
import { getWorkoutsQuery } from "./states";

export function DailyContent() {
  const workouts = useRecoilValue(getWorkoutsQuery);

  return (
    <>
      {workouts.length > 0 ? <WorkoutList /> : <SelectRoutine />}
    </>
  )
}