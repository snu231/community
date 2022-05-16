import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/authcredential.dto';
import { DeleteUserByUserIdlDto } from './dto/deleteUserByUserId.dto';
import { LoginlDto } from './dto/login.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './pipe/jwt-payload.interface';
import { User } from './user.entity';
//import { BoardLikeRepository } from './boardLIke.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,

        /*@InjectRepository(BoardLikeRepository)
        private boardLikeRepository: BoardLikeRepository*/
    ){
    }

    async singUp( authCredential : AuthCredentialDto  ): Promise<void> {
        return this.userRepository.createUser(authCredential);
    }

    async checkUserId(userID : string ): Promise<boolean>{
        const hasSameUserId = await this.userRepository.find({userID});

        if(!hasSameUserId) return true;
        return false;
    }
    async checkUserName(username : string ): Promise<boolean>{
        const hasSameUserName = await this.userRepository.find({username});

        if(!hasSameUserName) return true;
        return false;
    }



    async getUserProfileById( id : number ) : Promise<User>{
        const profile = await this.userRepository.findOne({ id });

        return profile;

    }

    async signIn(loginInfo : LoginlDto) : Promise<  string> {

        const userID = await this.userRepository.signIn(loginInfo);

        //if( !userID) throw new UnauthorizedException('Invalid credentials');


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

    async softDeleteUserByID( deleteUserByUserIdDto: DeleteUserByUserIdlDto ) : Promise<void> {

        const userID = deleteUserByUserIdDto.userID;
        const user = await this.userRepository.findOne( {userID} );

        
        if( user === undefined  ){
            throw new UnprocessableEntityException(`Cant't Delete User with id ${ userID  }`);
        }


        this.userRepository.softDelete(user.id);
    }

    
}
