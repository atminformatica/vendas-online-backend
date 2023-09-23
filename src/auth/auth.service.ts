import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        //private jwtService: JwtService,
      ) {}

    async login(loginDto: loginDto): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.userService
          .findUserByEmail(loginDto.email)
          .catch(() => undefined);
    
        const isMatch = await compare(
          loginDto.password,
          user?.password || ''
        );
    
        if (!user || !isMatch) {
          throw new NotFoundException('Email or passord invalid');
        }
    
        return user
      }
}
