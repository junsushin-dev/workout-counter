export interface IExercise {
  id: number;
  name: string;
  count: number;
}

export type AddExerciseDTO = Omit<IExercise, 'id'>;

export interface IRoutine {
  id: number;
  name: string;
  exercises: IExercise[];
}

export interface IWorkout {
  id: number;
  exercise: IExercise;
  doneCount: number;
  date: string;
}
