import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength  } from "class-validator";
import { NotIn } from "../pipe/notin.pipe";

export class AuthCredentialDto {

    //@Transform(params => params.value.trim() )
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @NotIn('password', {message: '비밀번호가 아이디와 같은 패턴을 포함할 수 없습니다'})
    userID: string;

    @Transform(params => {
        console.log(params);
        return params.value.trim()
     } )
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @NotIn('password', {message: '비밀번호가 닉네임와 같은 패턴을 포함할 수 없습니다'})
    username: string;

    @Matches(/^[A-Za-z\d!@#$%^&*()]{4,30}$/ , {
        message: 'password only accepts english or number'
    })
    password: string;

}