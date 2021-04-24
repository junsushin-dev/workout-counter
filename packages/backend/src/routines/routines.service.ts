import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Exercise } from '../exercises/exercise.entity';
import { AddExerciseToRoutineDTO } from './dto/add-exercise-to-routine.dto';
import { CreateRoutineDTO } from './dto/create-routine.dto';
import { UpdateRoutineDTO } from './dto/update-routine.dto';
import { Routine } from './routine.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createRoutineDTO: CreateRoutineDTO): Promise<Routine> {
    const routine = new Routine();
    routine.name = createRoutineDTO.name;
    return this.routineRepository.save(routine);
  }

  async findAll(): Promise<Routine[]> {
    return this.routineRepository.find({ relations: ['exercises'] });
  }

  async findOne(id: string): Promise<Routine> {
    return this.routineRepository.findOne(id, { relations: ['exercises'] });
  }

  async update(id: string, updateRoutineDTO: UpdateRoutineDTO) {
    await this.routineRepository.update(id, updateRoutineDTO);
    return this.routineRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.routineRepository.delete(id);
  }

  async addExercise(
    id: string,
    addExerciseToRoutineDTO: AddExerciseToRoutineDTO,
  ) {
    const routine = await this.routineRepository.findOne(id, {
      relations: ['exercises'],
    });
    const exercise = await this.exerciseRepository.findOne(
      addExerciseToRoutineDTO.exerciseId,
    );
    routine.exercises.push(exercise);
    this.routineRepository.save(routine);
    this.exerciseRepository.save(exercise);
    return routine;
  }

  async removeExercise(id: string, exerciseId: string) {
    const routine = await this.routineRepository.findOne(id, {
      relations: ['exercises'],
    });

    routine.exercises = routine.exercises.filter(
      (exercise) => exercise.id !== parseInt(exerciseId),
    );
    this.routineRepository.save(routine);
    return routine;
  }
}
