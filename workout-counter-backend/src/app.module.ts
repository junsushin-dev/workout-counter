import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesModule } from './exercises/exercises.module';
import { RoutinesModule } from './routines/routines.module';

@Module({
  imports: [TypeOrmModule.forRoot({}), ExercisesModule, RoutinesModule],
})
export class AppModule {}
