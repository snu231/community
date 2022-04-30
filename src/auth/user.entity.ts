import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    userID: string;

    @Column({ length: 30 })
    username: string;

    @Column( )
    password: string;

    @OneToMany(type=> Board, board => board.user, { eager: true } )
    boards: Board[];

}