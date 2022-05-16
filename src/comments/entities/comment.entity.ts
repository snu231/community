
import { User } from "src/auth/user.entity";
import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type=> Comment, parentComment=> parentComment.childComments , {onDelete: 'SET NULL'} )
    parentComment: Comment

    @OneToMany(type=> Comment, childComment=> childComment.parentComment  )
    childComments: Comment[]

    @ManyToOne(type=> User, user => user.boards  , { onDelete: 'SET NULL' } )
    user: User

    @ManyToOne(type=>Board, board => board.comments, { onDelete: 'SET NULL'} )
    board: Board

}