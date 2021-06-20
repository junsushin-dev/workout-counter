import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/exercises/exercise.entity';
import { In, Repository } from 'typeorm';

import { CreateWorkoutsDTO } from './dto/create-workout.dto';
import { Workout } from './workout.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>
  ) {}

  async create(createWorkoutsDTO: CreateWorkoutsDTO): Promise<Workout[]> {
    const { date, exerciseIds } = createWorkoutsDTO;
    const exercises = await this.exerciseRepository.find({
      id: In(exerciseIds),
    });
    const workouts = exercises.map((exercise) => {
      const workout = new Workout();
      workout.date = date;
      workout.exercise_name = exercise.name;
      workout.exercise_count = exercise.count;
      return workout;
    });
    return this.workoutRepository.save(workouts);
  }

  async findAll(date: Date) {
    const workoutsInDB = await this.workoutRepository.find({ where: { date }, relations: ['exercise'] });
    return workoutsInDB;
  }

  async updateDoneCount(id: number, count: number) {
    const workout = await this.workoutRepository.findOne(id);
    workout.doneCount = count;
    return this.workoutRepository.save(workout);
  }

  async remove(id: number) {
    await this.workoutRepository.delete(id);
  }
}
