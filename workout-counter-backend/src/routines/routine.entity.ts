import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToOne(() => UserInputError, (user) => user.routines)
  // user: User;

  @ManyToMany(() => Exercise)
  @JoinTable()
  exercises: Exercise[];
}
