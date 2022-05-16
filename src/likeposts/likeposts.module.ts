import { Module } from '@nestjs/common';
import { LikepostsService } from './likeposts.service';
import { LikepostsController } from './likeposts.controller';

@Module({
  controllers: [LikepostsController],
  providers: [LikepostsService]
})
export class LikepostsModule {}
