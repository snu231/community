import { BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardDto } from './dto/create-board.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async getBoardById(id: number): Promise<Board> {

        const board = await this.findOne( id );

        if( !board ){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }


        
        return board;
    }

    async createBoard(createBoardDto: BoardDto, user: User  ):  Promise<Board>{

        const { title, description } = createBoardDto;

        const board = this.create({
            
            description,
            title,
            user,
        })
        await this.save(board);

        return board;
    }
    
    async updateBoard( id: number , updateBoard : BoardDto, user : User  ): Promise<Board>{
        
        const board =  await this.getBoardById(id);

        board.title = updateBoard.title;
        board.description  = updateBoard.description ;

        await this.save(board);
        return board;
    }

    

    /*async deleteBoardById(id: number) : Promise<void>{
        const result = await this.delete(id);

        if( result.affected === 0 ){
            throw new NotFoundException(`Cant't find Board with id ${id}`);
        }
    }*/

    async getAllBoards(): Promise<Board[]> {

        return await this.find();
    }


    async likeBoard(id: number, user: User) : Promise<number>{
        

        //if( board.user.id === user.id ) throw new BadRequestException(`You Can't like your own post`);
        //const likes = board.likes;
        console.log("asdf");
        //console.log(board.user );



        //const alreadyLiked = board.likes. ({userid: user.id});
        //if( alreadyLiked ) board.likes.remove({user })

        return 1;
        
    }
}