import { Test, TestingModule } from '@nestjs/testing';
import { LikepostsController } from './likeposts.controller';
import { LikepostsService } from './likeposts.service';

describe('LikepostsController', () => {
  let controller: LikepostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikepostsController],
      providers: [LikepostsService],
    }).compile();

    controller = module.get<LikepostsController>(LikepostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
