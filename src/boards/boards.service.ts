import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardDto } from './dto/board.dto';
import { User } from '../auth/user.entity';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    async getAllBoards(): Promise<Board[]> {

        return await this.boardRepository.getAllBoards() ;
    }

    async getMyBoards(
        user: User
    ) : Promise<Board[]>{

        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userID = :userId', {userId: user.id});
        const boards = await query.getMany();

        return boards;
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

    async updateBoard( id: number , updateBoard : BoardDto  ): Promise<Board>{
        
        return await this.boardRepository.updateBoard(id, updateBoard);
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

}