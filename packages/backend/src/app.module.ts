import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesModule } from './exercises/exercises.module';
import { RoutinesModule } from './routines/routines.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        "type": "mysql",
        "host": configService.get('DB_HOST'),
        "port": configService.get<number>('DB_PORT'),
        "username": configService.get('DB_USERNAME'),
        "password": configService.get('DB_PASSWORD'),
        "database": configService.get('DB_SCHEMA'),
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true,
      }),
      inject: [ConfigService],
    }),
    ExercisesModule,
    RoutinesModule,
    WorkoutsModule,
  ],
})
export class AppModule {}
