import { Exercise } from 'src/exercises/exercise.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
