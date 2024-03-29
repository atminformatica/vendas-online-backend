import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
      ) {}

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
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
    
        return {
            accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user),
          };
      }
}
