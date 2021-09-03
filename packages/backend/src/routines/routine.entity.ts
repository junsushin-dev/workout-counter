import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => RoutineToExercise, (routineToExercise) => routineToExercise.routine)
  public routineToExercises!: RoutineToExercise[];
}

@Entity()
export class RoutineToExercise {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public routineId!: number;

  @Column()
  public exerciseId!: number;

  @Column()
  public order!: number;

  @ManyToOne(() => Routine, (routine) => routine.routineToExercises)
  public routine!: Routine;

  @ManyToOne(() => Exercise, (exercise) => exercise.routineToExercises)
  public exercise!: Exercise;
}
