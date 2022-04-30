
import {  IsString   } from "class-validator";

export class DeleteUserByUserIdlDto {

    @IsString()
    userID: string;


}