import { Exercise } from 'src/exercises/exercise.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise)
  exercise: Exercise;

  // @ManyToOne(() => User)
  // user: User;

  @Column({
    default: 0,
  })
  doneCount: number;

  @Column({ type: 'date' })
  date: Date;
}
