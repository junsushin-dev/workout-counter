import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

import { AddExerciseToRoutineDTO } from './dto/exercise-to-routine.dto';
import { CreateRoutineDTO, UpdateRoutineDTO } from './dto/routine.dto';
import { RoutinesService } from './routines.service';

@Controller('routines')
export class RoutineController {
  constructor(private routineService: RoutinesService) {}

  @Post()
  async create(@Body() createRoutineDTO: CreateRoutineDTO) {
    return this.routineService.create(createRoutineDTO);
  }

  @Get()
  async findAll() {
    const routines = await this.routineService.findAll();

    return routines.map(this.routineService.convertToGetRoutineDTO);
  }

  @Get(':id')
  async find(id) {
    const routine = await this.routineService.findOne(id);

    return this.routineService.convertToGetRoutineDTO(routine);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoutineDTO: UpdateRoutineDTO) {
    return this.routineService.update(id, updateRoutineDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.routineService.remove(id);
  }

  @Post(':id/exercises')
  async addExercise(@Param('id') id: string, @Body() addExerciseToRoutineDTO: AddExerciseToRoutineDTO) {
    await this.routineService.addExercise(id, addExerciseToRoutineDTO);
    const routine = await this.routineService.findOne(id);

    return this.routineService.convertToGetRoutineDTO(routine);
  }

  @Delete(':id/exercises/:exerciseId')
  async removeExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    await this.routineService.removeExercise(id, exerciseId);
    const routine = await this.routineService.findOne(id);

    return this.routineService.convertToGetRoutineDTO(routine);
  }
}
