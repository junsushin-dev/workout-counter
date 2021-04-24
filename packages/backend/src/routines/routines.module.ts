import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from '../exercises/exercise.entity';
import { Routine } from './routine.entity';
import { RoutineController } from './routines.controller';
import { RoutinesService } from './routines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, Exercise])],
  controllers: [RoutineController],
  providers: [RoutinesService],
  exports: [RoutinesService],
})
export class RoutinesModule {}
