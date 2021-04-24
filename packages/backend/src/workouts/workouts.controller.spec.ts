/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutsController } from './workouts.controller';

describe('WorkoutsController', () => {
  let controller: WorkoutsController;

  // TODO: Mock Provider to inject for testing
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [WorkoutsController],
  //   }).compile();

  //   controller = module.get<WorkoutsController>(WorkoutsController);
  // });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
