export interface IWorkout {
  id: number;
  exercise: {
    id: number;
    name: string;
    count: number;
  }
  done: number;
  date: string;
}

export const getTodayWorkouts = async ():Promise<IWorkout[]> => {
  const [dateString] = new Date().toISOString().split('T');
  const res = await fetch(`/api/workouts?date=${dateString}`, {
    headers: {
      "Accept": 'application/json',
    },
  });
  const data = await res.json();
  return data.workouts;
}