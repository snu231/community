import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches   } from "class-validator";

export class LoginlDto {

    @Transform(params => params.value.trim() )
    @IsString()
    @IsNotEmpty()
    userID: string;

    @Matches(/^[A-Za-z\d!@#$%^&*()]{4,30}$/ , {
        message: 'password only accepts english or number'
    })
    password: string;

}