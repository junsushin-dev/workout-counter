import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ManyToOne,
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
}
