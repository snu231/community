import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){
        super({
            secretOrKey : jwtConfig.secret,

            
            
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    //console.log(request?.cookies);
                    return request?.cookies?.Authentication;
                },
            ]),
        })
    }

    async validate(payload) : Promise<User> {
        const {userID} = payload;

        console.log(  userID );

        const user: User = await this.userRepository.findOne( {userID} );


        if(!user) throw new UnauthorizedException();

        return user;
    }

}