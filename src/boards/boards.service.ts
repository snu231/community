import { BadRequestException, ConsoleLogger, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Board } from './board.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardDto } from './dto/create-board.dto';
import { User } from '../auth/user.entity';

import { NotFoundException } from '@nestjs/common';
import { BoardLikeRepository } from './boardLike.repository';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,

        @InjectRepository(BoardLikeRepository)
        private boardLikeRepository: BoardLikeRepository
    ){}

    async getAllBoards(): Promise<Board[]> {

        const query = this.boardRepository.createQueryBuilder('board');

        query.leftJoinAndSelect('board.user', 'user').select( [ 'board.title', 'board.description', 'board.id', 'board.updatedAt',  'board.num_comments', 'board.num_likes', 'user' ]) ;

        const boards = await query.getMany();

        console.log(boards);

        return boards;
    }

    async getMyBoards(
        user: User
    ) : Promise<Board[]>{

        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.user = :userId', {userId: user.id}).leftJoinAndSelect('board.user', 'user').select( [ 'board.title', 'board.description', 'board.id', 'board.updatedAt',  'board.num_comments', 'board.num_likes', 'user.username' ]) ;

        const boards = await query.getMany();

        console.log(boards);

        return boards;
    }

    async addNumCommnet( board: Board): Promise<void>{
        board.num_comments++;

        await this.boardRepository.save(board);
    }

    async createBoard( createBoard: BoardDto, user : User ): Promise<Board>{

        return await this.boardRepository.createBoard(createBoard, user );
    }

    async getBoardById(id: number): Promise<Board> {

        const board = await this.boardRepository.getBoardById(id);

        board.views ++;
        await this.boardRepository.save(board);

        return board;
    }

    async updateBoard( id: number , updateBoard : BoardDto, user : User  ): Promise<Board>{

        return await this.boardRepository.updateBoard(id, updateBoard, user);
    } 

    async deleteBoardById(id: number, user : User): Promise<void> {

        const result = await this.boardRepository.delete({id, user});

        if( Number(result.affected) === 0){
            throw new NotFoundException(`Cant't find Board with id ${id}`);
        }
        
    }

    async masterDeleteBoardById(id: number ): Promise<void> {

        const result = await this.boardRepository.delete(id);

        if( Number(result.affected) === 0){
            throw new NotFoundException(`Cant't find Board with id ${id}`);
        }
        
    }

    async likeBoard(id: number, user: User): Promise<number>{

        const board = await this.boardRepository.getBoardById(id);

        const deleteLike = await this.boardLikeRepository.delete( {user , board  })    ;

        if(deleteLike.affected  == 0){
            await this.boardLikeRepository.create({
                user,
                board
            }).save();

            board.num_likes++;
            this.boardRepository.save(board);

            return 1;
        }else{

            board.num_likes--;
            this.boardRepository.save(board);
            
            return -1;
        }

        /*
        const query = this.boardRepository.createQueryBuilder('board').select([
            'board.id',
            'board.user',
        ]).where('board.id = :id', {id })  ;
        const board = await query.getOne();
        if( !board ) throw new NotFoundException(`Can't find Board with id ${id}`);

        //console.log("board : ", board);
        
        query.leftJoinAndSelect('board.user', 'user')//select(['board.user'])  //.where('user.id  = :id ', {id : user.id }) ;
        const boardWriter = await query.getOne();
        console.log(boardWriter);
        if( boardWriter.user && boardWriter.user.id === user.id ) throw new UnprocessableEntityException(`Can't like your own post`);

        
        query.leftJoinAndSelect('board.likes', 'board_like').leftJoinAndSelect('board_like.user', 'likeuser').andWhere('board_like.user = :userId ', {userId : user.id}  );
        const like = await query.getOne();

        console.log(like);

        if( like ){
            console.log("hello");
            query.delete().from('board_like').where('user = :userId', { userId: user.id}).execute();
            
        }else{
            console.log("hellobb")
            query.insert().into( 'board_like' ).values([  {user, board} ]).execute();
        }

        const boardLike = this.boardLikeRepository.create({
            user,
            board
        })
        this.boardLikeRepository.save(boardLike);

        
        console.log(like);*/
        
    }

}