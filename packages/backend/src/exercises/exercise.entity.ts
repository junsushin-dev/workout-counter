import { Routine, RoutineToExercise } from 'src/routines/routine.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 15 })
  name: string;

  @Column()
  count: number;

  @ManyToMany(() => Routine)
  @JoinTable()
  routines: Routine[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => RoutineToExercise, (routineToExercise) => routineToExercise.exercise)
  public routineToExercises!: RoutineToExercise[];
}
