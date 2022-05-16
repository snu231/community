import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsModule } from 'src/boards/boards.module';

import { CommentRepository } from './comment.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports:  [
    TypeOrmModule.forFeature([CommentRepository] ),
    AuthModule,
    BoardsModule
  ],
  controllers: [ CommentsController],
  providers: [ CommentsService ],
})
export class CommentsModule {}
