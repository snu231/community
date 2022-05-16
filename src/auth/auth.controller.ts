import {  Body, Controller, Delete, Get, Post, Req, Res, UseGuards, ValidationPipe   } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authcredential.dto';
import { DeleteUserByUserIdlDto } from './dto/deleteUserByUserId.dto';
import { LoginlDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';;

import {User} from './user.entity'

import { Request, Response } from 'express';
import { AuthUserGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}


    @Post('/signup')
    async signUp(@Body(ValidationPipe) authcredential :AuthCredentialDto): Promise<void>{
        return await this.authService.singUp(authcredential);
    }

    @Get('/check/userid')
    async checkUserId(@Body('userid') userid: string ) : Promise<string>{
        const hasSameUserId = this.authService.checkUserId(userid);

        if(!hasSameUserId) return "사용할 수 있는 ID입니다";
        return "이미 존재하는 ID입니다";
    }

    @Get('/check/username')
    async checkUserName(@Body('userid') userid: string ) : Promise<string>{
        const hasSameUserId = this.authService.checkUserName(userid);

        if(!hasSameUserId) return "사용할 수 있는 닉네임입니다";
        return "이미 존재하는 닉네임입니다";
    }

    @Delete('/soft_signout')
    async softDeleteUserById( @Body() deleteUserByUserIdDto: DeleteUserByUserIdlDto ): Promise<void>{
        
        this.authService.softDeleteUserByID(deleteUserByUserIdDto);
    }

    @Delete('/signout')
    async deleteUserById( @Body() deleteUserByUserIdDto : DeleteUserByUserIdlDto  ) : Promise<void> {
        return await this.authService.deleteUserByID( deleteUserByUserIdDto );
    }
    
    @Post('/login')    
    async signIn(@Req() req, @Body(ValidationPipe) loginInfo : LoginlDto,  @Res({passthrough: true}) res :  Response ) : Promise<any> {

        const token =  await this.authService.signIn(loginInfo);     

        //await res.setHeader('Authorization', 'Bearer' + token  );

        //console.log( res   );

        await res.cookie('Authentication', token , {
            domain: 'localhost',
            path: '/',
            //maxAge: 10000,
            httpOnly: true
        });
        
        await res.send({
            message: 'success'
        });


    }
    
    @Delete('/logout')
    async logout( @Res({passthrough: true}) res : Response ): Promise<void> {
        //const { token, ...option } = this.authService.logout();
        const token = '';

        res.cookie('Authentication', token, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 0,
        });

    }
    
    
    @Post('/test')
    @UseGuards( AuthUserGuard  )
    test( @GetUser() user:User  ){
        console.log('user', user  );
    }

    
}
