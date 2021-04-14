import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/exercises/exercise.entity';
import { Workout } from './workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, Workout])],
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
