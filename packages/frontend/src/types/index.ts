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

export type AddRoutineDTO = Omit<IRoutine, 'id' | 'exercises'>;

export interface AddExerciseToRoutineDTO {
  exerciseId: number;
  order: number;
}

export interface IWorkout {
  id: number;
  doneCount: number;
  date: string;
  exercise_name: string;
  exercise_count: number;
}
