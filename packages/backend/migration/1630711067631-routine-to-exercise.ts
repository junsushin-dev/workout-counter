import { Routine } from 'src/routines/routine.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class routineToExercise1630711067631 implements MigrationInterface {
  name = 'routineToExercise1630711067631';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `routine_to_exercise` (`id` int NOT NULL AUTO_INCREMENT, `routineId` int NOT NULL, `exerciseId` int NOT NULL, `order` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `routine_to_exercise` ADD CONSTRAINT `FK_144c4f42357875a14ec088f6d5e` FOREIGN KEY (`routineId`) REFERENCES `routine`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `routine_to_exercise` ADD CONSTRAINT `FK_960450d0aa25c1c962f5e52dbcd` FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(`
        INSERT INTO routine_to_exercise (
          routineId,
          exerciseId,
          \`order\`
        )
        SELECT routineId, exerciseId, '0'
        FROM routine_exercises_exercise
      `);
    // Update order, incrementing value for every entry in routine
    const routines = await queryRunner.manager.find(Routine, { relations: ['routineToExercises'] });
    routines.forEach((routine) => {
      routine.routineToExercises.forEach((routineToExercise, index) => {
        routineToExercise.order = index;
        queryRunner.manager.save(routineToExercise);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `routine_to_exercise` DROP FOREIGN KEY `FK_960450d0aa25c1c962f5e52dbcd`');
    await queryRunner.query('ALTER TABLE `routine_to_exercise` DROP FOREIGN KEY `FK_144c4f42357875a14ec088f6d5e`');
    await queryRunner.query('DROP TABLE `routine_to_exercise`');
  }
}
