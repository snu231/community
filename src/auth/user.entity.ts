import { Board } from "src/boards/board.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BoardLike  } from "../boards/boardLike.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    userID: string;

    @Column({ length: 30 })
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column( )
    password: string;

    @OneToMany(type=> Board, board => board.user, { eager: false } )
    boards: Board[];

    @OneToMany(type=> Comment, comment=> comment.user, {eager: false} )
    comments: Comment[];

    @OneToMany(type=> BoardLike, boardLike=> boardLike.user, {eager: false} )
    boardLikes: BoardLike[];
    

}