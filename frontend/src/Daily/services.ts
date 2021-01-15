const MINUTE_MILLISECS = 60 * 1000;

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

export const getDateString = (date: Date):string => new Date(date.getTime() - date.getTimezoneOffset() * MINUTE_MILLISECS).toISOString().split('T')[0];

export const getTodayString = ():string => getDateString(new Date());

export const getTodayWorkouts = async ():Promise<IWorkout[]> => {
  const res = await fetch(`/api/workouts?date=${getTodayString()}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await res.json();
  return data.workouts;
}

export const updateDoneCount = async (date: Date, name: string, doneCount: number):Promise<void> => {
  const body = new URLSearchParams();
  body.set('date', getDateString(date));
  body.set('name', name);
  body.set('done', doneCount.toString());
  const res = await fetch('/api/workouts', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json'
    },
    body,
  });
  const data = res.json();
  return data;
}