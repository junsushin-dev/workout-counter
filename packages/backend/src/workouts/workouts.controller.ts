import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateWorkoutsDTO } from './dto/create-workout.dto';
import { UpdateWorkoutDTO } from './dto/update-workout.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() createWorkoutsDTO: CreateWorkoutsDTO) {
    return this.workoutsService.create(createWorkoutsDTO);
  }

  @Get()
  async findAll(@Query('date') date: Date) {
    return this.workoutsService.findAll(date);
  }

  // @Get(':id')
  // async find(id) {
  //   return this.workoutsService.findOne(id);
  // }

  @Patch(':id')
  async updateDoneCount(@Param('id') id: number, @Body() updateWorkoutDTO: UpdateWorkoutDTO) {
    return this.workoutsService.updateDoneCount(id, updateWorkoutDTO.count);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.workoutsService.remove(id);
  }
}
