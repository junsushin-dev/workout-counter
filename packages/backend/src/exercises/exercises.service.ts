import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDTO: CreateExerciseDTO): Promise<Exercise> {
    const exercise = new Exercise();
    exercise.name = createExerciseDTO.name;
    exercise.count = createExerciseDTO.count;

    return this.exercisesRepository.save(exercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exercisesRepository.find();
  }

  async findOne(id: string): Promise<Exercise> {
    return this.exercisesRepository.findOne(id);
  }

  async update(id: string, updateExerciseDTO: UpdateExerciseDTO) {
    await this.exercisesRepository.update(id, updateExerciseDTO);
    return this.exercisesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.exercisesRepository.delete(id);
  }
}
