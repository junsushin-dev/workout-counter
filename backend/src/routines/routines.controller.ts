import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AddExerciseToRoutineDTO } from './dto/add-exercise-to-routine.dto';
import { CreateRoutineDTO } from './dto/create-routine.dto';
import { UpdateRoutineDTO } from './dto/update-routine.dto';
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
    return this.routineService.findAll();
  }

  @Get(':id')
  async find(id) {
    return this.routineService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoutineDTO: UpdateRoutineDTO,
  ) {
    return this.routineService.update(id, updateRoutineDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.routineService.remove(id);
  }

  @Post(':id/exercises')
  async addExercise(
    @Param('id') id: string,
    @Body() addExerciseToRoutineDTO: AddExerciseToRoutineDTO,
  ) {
    return this.routineService.addExercise(id, addExerciseToRoutineDTO);
  }

  @Delete(':id/exercises/:exerciseId')
  async removeExercise(
    @Param('id') id: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    return this.routineService.removeExercise(id, exerciseId);
  }
}
