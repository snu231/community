import { Test, TestingModule } from '@nestjs/testing';
import { LikepostsService } from './likeposts.service';

describe('LikepostsService', () => {
  let service: LikepostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikepostsService],
    }).compile();

    service = module.get<LikepostsService>(LikepostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
