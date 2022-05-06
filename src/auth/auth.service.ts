import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/authcredential.dto';
import { DeleteUserByUserIdlDto } from './dto/deleteUserByUserId.dto';
import { LoginlDto } from './dto/login.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './pipe/jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){
    }

    async singUp( authCredential : AuthCredentialDto  ): Promise<void> {
        return this.userRepository.createUser(authCredential);
    }

    async getUserProfileById( id : number ) : Promise<User>{
        const profile = await this.userRepository.findOne({ id });

        return profile;

    }

    async signIn(loginInfo : LoginlDto) : Promise<  string> {

        const userID = await this.userRepository.signIn(loginInfo);

        if( !userID) throw new UnauthorizedException('Invalid credentials');


        const payload : JwtPayload = { userID };
        const accessToken = await this.jwtService.sign(payload);
        
        return accessToken ;
    }
    /*
    async logout() : Promise<{}>{
        return {
            token: '',
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 0,
          };
    }*/

    async deleteUserByID( deleteUserByUserIdDto: DeleteUserByUserIdlDto ) : Promise<void> {

        return await this.userRepository.deleteUserById( deleteUserByUserIdDto);
    }

    
}
