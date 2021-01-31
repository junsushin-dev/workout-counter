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