import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddExerciseToRoutineDTO } from './dto/exercise-to-routine.dto';
import { CreateRoutineDTO, GetRoutineDTO, UpdateRoutineDTO } from './dto/routine.dto';
import { Routine, RoutineToExercise } from './routine.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(RoutineToExercise)
    private routineToExerciseRepository: Repository<RoutineToExercise>
  ) {}

  async create(createRoutineDTO: CreateRoutineDTO): Promise<Routine> {
    const routine = new Routine();
    routine.name = createRoutineDTO.name;
    return this.routineRepository.save(routine);
  }

  async findAll(): Promise<Routine[]> {
    return this.routineRepository.find({ relations: ['routineToExercises', 'routineToExercises.exercise'] });
  }

  async findOne(id: string): Promise<Routine> {
    return this.routineRepository.findOne(id, { relations: ['routineToExercises', 'routineToExercises.exercise'] });
  }

  async update(id: string, updateRoutineDTO: UpdateRoutineDTO) {
    await this.routineRepository.update(id, updateRoutineDTO);
    return this.routineRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.routineRepository.delete(id);
  }

  async addExercise(id: string, addExerciseToRoutineDTO: AddExerciseToRoutineDTO) {
    const routineToExercise = new RoutineToExercise();
    routineToExercise.routineId = parseInt(id);
    routineToExercise.exerciseId = parseInt(addExerciseToRoutineDTO.exerciseId);
    routineToExercise.order = addExerciseToRoutineDTO.order;
    this.routineToExerciseRepository.save(routineToExercise);
  }

  async removeExercise(id: string, exerciseId: string) {
    const routine = await this.routineRepository.findOne(id, {
      relations: ['routineToExercises', 'routineToExercises.exercise'],
    });

    const routineToExercisesToRemove = routine.routineToExercises.filter(
      (routineToExercise) => routineToExercise.exerciseId === parseInt(exerciseId)
    );

    await this.routineToExerciseRepository.remove(routineToExercisesToRemove);
  }

  convertToGetRoutineDTO(routine: Routine): GetRoutineDTO {
    const { id, name, routineToExercises } = routine;

    const orderedExercises = routineToExercises
      .sort((a, b) => a.order - b.order)
      .map((routineToExercise) => routineToExercise.exercise);

    return {
      id,
      name,
      exercises: orderedExercises,
    };
  }
}
