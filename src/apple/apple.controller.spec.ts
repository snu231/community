import { Test, TestingModule } from '@nestjs/testing';
import { AppleController } from './apple.controller';
import { AppleService } from './apple.service';

describe('AppleController', () => {
  let controller: AppleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppleController],
      providers: [AppleService],
    }).compile();

    controller = module.get<AppleController>(AppleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
