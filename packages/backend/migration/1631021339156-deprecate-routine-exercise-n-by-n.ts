import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeprecateRoutineExerciseNbyN1631021339156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `routine_exercises_exercise`');
    await queryRunner.query('DROP TABLE `exercise_routines_routine`');
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`routine_exercises_exercise\` (
        \`routineId\` int(11) NOT NULL,
        \`exerciseId\` int(11) NOT NULL,
        PRIMARY KEY (\`routineId\`,\`exerciseId\`),
        KEY \`IDX_5ef75d49ab8e32a48bb67ca6e6\` (\`routineId\`),
        KEY \`IDX_4856addae8ec63169de696f2d0\` (\`exerciseId\`),
        CONSTRAINT \`FK_4856addae8ec63169de696f2d09\` FOREIGN KEY (\`exerciseId\`) REFERENCES \`exercise\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT \`FK_5ef75d49ab8e32a48bb67ca6e60\` FOREIGN KEY (\`routineId\`) REFERENCES \`routine\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
      CREATE TABLE \`exercise_routines_routine\` (
        \`exerciseId\` int(11) NOT NULL,
        \`routineId\` int(11) NOT NULL,
        PRIMARY KEY (\`exerciseId\`,\`routineId\`),
        KEY \`IDX_32bf1c01de578079fdd672bb75\` (\`exerciseId\`),
        KEY \`IDX_9487ce6f1580d2b68e486d4f1e\` (\`routineId\`),
        CONSTRAINT \`FK_32bf1c01de578079fdd672bb752\` FOREIGN KEY (\`exerciseId\`) REFERENCES \`exercise\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT \`FK_9487ce6f1580d2b68e486d4f1e7\` FOREIGN KEY (\`routineId\`) REFERENCES \`routine\` (\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
      INSERT INTO routine_exercises_exercise (
        \`routineId\`,
        \`exerciseId\`
      )
      SELECT \`routineId\`, \`exerciseId\`
      FROM \`routine_to_exercise\`
    `);
  }
}
