import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/authcredential.dto';

import * as bcrypt from 'bcryptjs';
import { LoginlDto } from './dto/login.dto';
import { DeleteUserByUserIdlDto } from './dto/deleteUserByUserId.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {


    async createUser(authCredential  : AuthCredentialDto ): Promise<void> {
        const {userID, username, password} = authCredential;
        
        const User = await this.findOne({userID});
        if( User ) throw new UnprocessableEntityException('이미 존재하는 ID입니다');

        const User2 = await this.findOne({username});
        if( User2 ) throw new UnprocessableEntityException('이미 존재하는 nickname입니다');

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            userID,
            username,
            password: hashedPassword
        });

        try{
            await user.save();

        } catch (error) {
            console.log(error);

            

        }

    }
    async signIn( loginInfo : LoginlDto ): Promise<string> {
        const {userID,  password} = loginInfo;

        const user = await this.findOne({userID});

        if( user && (await bcrypt.compare(password, user.password) )){

            return userID;
        } else{
            throw new UnauthorizedException('login failed');
        }
    }

    async deleteUserById( deleteUserByUserIdDto : DeleteUserByUserIdlDto  ) : Promise<void>{
        const userID = deleteUserByUserIdDto.userID;
        const user = await this.findOne( {userID} );

        
        if( user === undefined  ){
            throw new NotFoundException(`Cant't Delete User with id ${ userID  }`);
        }


        this.delete( user.id );
    }

}