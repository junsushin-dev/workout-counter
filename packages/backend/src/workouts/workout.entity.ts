import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 15 })
  exercise_name: string;

  @Column()
  exercise_count: number;

  // @ManyToOne(() => User)
  // user: User;

  @Column({ default: 0, name: 'done_count' })
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
