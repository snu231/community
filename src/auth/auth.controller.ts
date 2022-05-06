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




    @Delete('/signout')
    async deleteUserById( @Body() deleteUserByUserIdDto : DeleteUserByUserIdlDto  ) : Promise<void> {
        return await this.authService.deleteUserByID( deleteUserByUserIdDto );
    }
    
    @Post('signin')    
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
    @UseGuards(AuthGuard() )
    test(@GetUser() user:User  ){
        console.log('user', user  );
    }

    
}
