/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutsService } from './workouts.service';

describe('WorkoutsService', () => {
  let service: WorkoutsService;

  // TODO: Mock Provider to inject for testing
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [WorkoutsService],
  //   }).compile();

  //   service = module.get<WorkoutsService>(WorkoutsService);
  // });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
