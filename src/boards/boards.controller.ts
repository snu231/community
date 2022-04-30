import { Controller, Get, Post, Delete, Put, Patch, Param, Body, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';

import { Board  } from './board.entity';
import { BoardDto } from './dto/board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardsService } from './boards.service';
//import { BoardStatusValidationPipe } from './pipes/board-status.validation.pipe';
//import { Repository } from 'typeorm';


@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(

        private boardService : BoardsService ,
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async createBoard( 
        @Body() createBoard : BoardDto,
        @GetUser() user: User,
     ): Promise<Board>{
    
        return await this.boardService.createBoard(createBoard, user);
    }
 
    @Get('/allBoards')
    async getAllBoards(): Promise<Board[]> {

        return await this.boardService.getAllBoards();
    }

    @Get()
    async getMyBoards(
        @GetUser() user: User
    ): Promise<Board[]>{

        return await this.boardService.getMyBoards(user);
    }

    @Get('/:id')
    async getBoardById(
        @Param('id', ParseIntPipe ) id
    ) : Promise<Board> {

        return await this.boardService.getBoardById(id);
    }
    
    @Patch('/:id')
    async updateBoard(
        @Param('id', ParseIntPipe ) id,
        @Body( ) updateboard : BoardDto
    ): Promise<Board> {
        //const id = updateBoardStatusDto.id;
        //const status = updateBoardStatusDto.status;

        return await this.boardService.updateBoard( id, updateboard );
    }

    @Delete('/:id')
    async deleteBoardById(
        @Param('id', ParseIntPipe ) id,
        @GetUser() user: User
    ) : Promise<void> {
        return await this.boardService.deleteBoardById(id, user);
    }

    @Delete('/master/:id')
    async masterDeleteBoardById(
        @Param('id', ParseIntPipe ) id,
    ) : Promise<void> {
        return await this.boardService.masterDeleteBoardById(id );
    }
    
}



/*   service

import { Injectable  } from '@nestjs/common';
import { Board } from './board.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    async getAllBoard(): Promise<Board[]> {

        return await this.boardRepository.getAllBoard() ;
    }

    async createBoard( createBoard: BoardDto ): Promise<Board>{

        return await this.boardRepository.createBoard(createBoard );
    }

    async getBoardById(id: number): Promise<Board> {

        return await this.boardRepository.getBoardById(id);
    }

    async updateBoard( id: number , updateBoard : BoardDto  ): Promise<Board>{
        
        return await this.boardRepository.updateBoard(id, updateBoard);
    } 

    async deleteBoardById(id: number): Promise<void> {
        
        return await this.boardRepository.deleteBoard(id);
    }

}



*/