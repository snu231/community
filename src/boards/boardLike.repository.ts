import { EntityRepository, Repository } from 'typeorm';
import { BoardLike } from './boardLike.entity';



@EntityRepository(BoardLike)
export class BoardLikeRepository extends Repository<BoardLike> {


}