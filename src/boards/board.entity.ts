import { BoardLike } from "src/boards/boardLike.entity";
import { User } from "src/auth/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { BaseEntity, Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({default: 0})
    views: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type=> User, user => user.boards  , { eager: false, onDelete: 'SET NULL' } )
    //@JoinColumn({name: 'postWriter'})
    user: User;

    @OneToMany(type=>Comment, comment => comment.board )
    comments: Comment[];

    @Column({default: 0})
    num_comments: number;

    @OneToMany(type=> BoardLike , like=>like.board )
    likes: BoardLike[]

    @Column({default: 0})
    num_likes : number;
}