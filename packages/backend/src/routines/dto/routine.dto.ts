import { Exercise } from '../../exercises/exercise.entity';

export class CreateRoutineDTO {
  name: string;
}

export class GetRoutineDTO {
  id: number;
  name: string;
  exercises: Exercise[];
}

export class UpdateRoutineDTO {
  name: string;
}
