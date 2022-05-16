import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
import { BoardsService } from 'src/boards/boards.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly boardsService : BoardsService,
    private readonly commentRepository: CommentRepository
  ){}

  async create(createCommentDto: CreateCommentDto, user: User, boardid : number): Promise<Comment> {
    const board  = await  this.boardsService.getBoardById(boardid);

    const comment =  this.commentRepository.create({
      description: createCommentDto.description,
      user,
      board
    })
    await this.commentRepository.save(comment);

    this.boardsService.addNumCommnet(board);

    return comment;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
