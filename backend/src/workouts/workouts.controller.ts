import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateWorkoutDTO } from './dto/create-workout.dto';
import { UpdateWorkoutDTO } from './dto/update-workout.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() createWorkoutDTO: CreateWorkoutDTO) {
    return this.workoutsService.create(createWorkoutDTO);
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
  async updateDoneCount(
    @Param('id') id: number,
    @Body() updateWorkoutDTO: UpdateWorkoutDTO,
  ) {
    return this.workoutsService.updateDoneCount(id, updateWorkoutDTO.count);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.workoutsService.remove(id);
  }
}
