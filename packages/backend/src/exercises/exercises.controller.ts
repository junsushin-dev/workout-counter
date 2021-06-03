import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { Exercise } from './exercise.entity';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDTO: CreateExerciseDTO) {
    return this.exercisesService.create(createExerciseDTO);
  }

  @Get()
  async findAll(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Exercise> {
    return this.exercisesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateExerciseDTO: UpdateExerciseDTO): Promise<Exercise> {
    return this.exercisesService.update(id, updateExerciseDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.exercisesService.remove(id);
  }
}
