import { Board } from "src/boards/board.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class BoardLike extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type=> User, user => user.boardLikes , { eager: true, onDelete: 'SET NULL' } )
    user: User

    @ManyToOne(type=>Board, board=>board.likes , {eager: true}   )
    board: Board
}