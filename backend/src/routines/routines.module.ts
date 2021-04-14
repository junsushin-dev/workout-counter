import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { Routine } from './routine.entity';
import { Exercise } from '../exercises/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, Exercise])],
  controllers: [RoutineController],
  providers: [RoutinesService],
  exports: [RoutinesService],
})
export class RoutinesModule {}
