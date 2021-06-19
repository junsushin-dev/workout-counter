import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class exerciseCopy1623718745290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('workout', [
      new TableColumn({ name: 'exercise_name', type: 'varchar' }),
      new TableColumn({ name: 'exercise_count', type: 'int' }),
    ]);
    await queryRunner.query(`
      UPDATE workout
        INNER JOIN exercise ON workout.exercise_id = exercise.id
        SET workout.exercise_name = exercise.name, workout.exercise_count = exercise.count
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workout', 'exercise_name');
    await queryRunner.dropColumn('workout', 'exercise_count');
  }
}
