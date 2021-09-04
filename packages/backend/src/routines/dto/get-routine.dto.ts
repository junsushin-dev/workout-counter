import { Exercise } from '../../exercises/exercise.entity';

export class GetRoutineDTO {
  id: number;
  name: string;
  exercises: Exercise[];
}
