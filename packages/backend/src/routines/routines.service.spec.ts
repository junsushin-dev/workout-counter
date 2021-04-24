/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';

describe('RoutinesService', () => {
  let service: RoutinesService;

  // TODO: Mock Service Provider to inject for testing
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [RoutinesService],
  //   }).compile();

  //   service = module.get<RoutinesService>(RoutinesService);
  // });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
