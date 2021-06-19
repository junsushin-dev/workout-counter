import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

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
    const table = await queryRunner.getTable('workout');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.includes('exercise_id'));
    await queryRunner.dropForeignKey('workout', foreignKey);
    await queryRunner.dropColumn('workout', 'exercise_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'workout',
      new TableColumn({
        name: 'exercise_id',
        type: 'int',
      })
    );
    await queryRunner.query(`
    UPDATE workout
      INNER JOIN exercise ON workout.exercise_name = exercise.name
      SET workout.exercise_id = exercise.id
    `);
    await queryRunner.createForeignKey(
      'workout',
      new TableForeignKey({
        columnNames: ['exercise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'exercise',
        onDelete: 'NO ACTION',
      })
    );
    await queryRunner.dropColumn('workout', 'exercise_name');
    await queryRunner.dropColumn('workout', 'exercise_count');
  }
}
