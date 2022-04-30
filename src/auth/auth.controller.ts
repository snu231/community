import { BadRequestException, Body, Controller, Delete, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authcredential.dto';
import { DeleteUserByUserIdlDto } from './dto/deleteUserByUserId.dto';
import { LoginlDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';

import { applyDecorators } from '@nestjs/common';

import {User} from './user.entity'

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}


    @Post('/signup')
    async signUp(@Body(ValidationPipe) authcredential :AuthCredentialDto): Promise<void>{
        return await this.authService.singUp(authcredential);
    }

    

    @Get('/profile')
    @UseGuards(AuthGuard())
    async getUserProfile(@GetUser() user: User) : Promise<User>{

        return await this.authService.getUserProfileById(user.id) ;
    }


    @Delete('/signout')
    async deleteUserById( @Body() deleteUserByUserIdDto : DeleteUserByUserIdlDto  ) : Promise<void> {
        return await this.authService.deleteUserByID( deleteUserByUserIdDto );
    }
    /*
    @Post('auth/signin')    
    async signIn(@Body(ValidationPipe) loginInfo : LoginlDto, @Res({passthrough: true}) res: Response  ) : Promise<void> {

        const token =  await this.authService.signIn(loginInfo);

        res.cookie('Authentication', token , {
            domain: 'localhost',
            path : '/',
            httpOnly: 'true',
        });

    }

    @Delete('auth/logout')
    async logout( @Res({passthrough: true}) res : Response ): Promise<void> {
        //const { token, ...option } = this.authService.logout();
        const token = '';
        res.cookie('Authentication', token, {
            token: '',
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 0,
        });

    }

    /*
    @Post('/test')
    @UseGuards(AuthGuard() )
    test(@Req() req){
        console.log('user', req.user );
    }*/

    
}
