import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/exercises/exercise.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutDTO } from './dto/create-workout.dto';
import { Workout } from './workout.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createWorkoutDTO: CreateWorkoutDTO): Promise<Workout> {
    const { date, exerciseId } = createWorkoutDTO;
    const exercise = await this.exerciseRepository.findOne(exerciseId);
    const workout = new Workout();
    workout.date = date;
    workout.exercise = exercise;
    return this.workoutRepository.save(workout);
  }

  async findAll(date: Date) {
    return this.workoutRepository.find({
      where: {
        date,
      },
      relations: ['exercise'],
    });
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
