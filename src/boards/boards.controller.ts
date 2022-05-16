import { Controller, Get, Post, Delete, Put, Patch, Param, Body, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger, BadRequestException, Query } from '@nestjs/common';

import { Board  } from './board.entity';
import { BoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardsService } from './boards.service';
import { identity } from 'rxjs';
import { AuthUserGuard } from 'src/auth/auth.guard';
//import { BoardStatusValidationPipe } from './pipes/board-status.validation.pipe';
//import { Repository } from 'typeorm';


@Controller('boards')
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(

        private boardService : BoardsService ,
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthUserGuard)
    async createBoard( 
        @Body() createBoard : BoardDto,
        @GetUser() user: User,
     ): Promise<Board>{
    
        return await this.boardService.createBoard(createBoard, user);
    }
 
    @Get('/allboards')
    async getAllBoards(): Promise<Board[]> {

        return await this.boardService.getAllBoards();
    }

    @Get()
    @UseGuards(AuthUserGuard)
    async getMyBoards(
        @GetUser() user: User
    ): Promise<Board[]>{

        return await this.boardService.getMyBoards(user);
    }

    @Get()
    async getBoardById(
        @Query('boardid', ParseIntPipe ) id
    ) : Promise<Board> {

        return await this.boardService.getBoardById(id);
    }
    
    @Patch()
    @UseGuards(AuthUserGuard)
    async updateBoard(
        @Query('boardid', ParseIntPipe ) id,
        @Body( ) updateboard : BoardDto,
        @GetUser() user: User
    ): Promise<Board> {
        //const id = updateBoardStatusDto.id;
        //const status = updateBoardStatusDto.status;
        if( id !== user.id ) throw new BadRequestException(`It's not your post`)

        return await this.boardService.updateBoard( id, updateboard, user );
    }

    @Delete()
    @UseGuards(AuthUserGuard)
    async deleteBoardById(
        @Query('boardid', ParseIntPipe ) id,
        @GetUser() user: User
    ) : Promise<void> {
        return await this.boardService.deleteBoardById(id, user);
    }

    @Delete('/master')
    async masterDeleteBoardById(
        @Query('boardid', ParseIntPipe ) id,
    ) : Promise<void> {
        return await this.boardService.masterDeleteBoardById(id );
    }

    @Patch('/like')
    @UseGuards(AuthUserGuard)
    async likeBoard(
        @Query('boardid', ParseIntPipe) id,
        @GetUser() user : User
    ) : Promise<number>{


        return await this.boardService.likeBoard(id, user);
    }
    
}
