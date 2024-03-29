import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import {hash} from 'bcrypt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async getAllUser():Promise<UserEntity[]>{
        return (
            this.userRepository.find()
        )
    }

    async createUser(createUserDto:CreateUserDto): Promise<UserEntity>{
        //verifica email
        const user = await this.findUserByEmail(createUserDto.email).catch(
          () => undefined,
        );
    
        if (user) {
          throw new BadGatewayException('email registered in system');
        }
        //cripytografar senha do usario usando bcrypt
        const saltOrRounds = 10;
        const password = createUserDto.password;     
        const passwordHashed = await hash(password, saltOrRounds);
        console.log("senha criptografada",passwordHashed)

        //salva o usuario no banco de dados -
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password:passwordHashed,
        })
    }
    
    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
          where: {
            id: userId,
          },
        });
    
        if (!user) {
          throw new NotFoundException(`UserId: ${userId} Not Found`);
        }
    
        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
  
      if (!user) {
        throw new NotFoundException(`Email: ${email} Not Found`);
      }
  
      return user;
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
          where: {
            id: userId,
          },
          //relations: ['addresses'],
          relations: {           
            addresses: {
              city: {
                state: true,
              },
            },
          }
        });
      }
}
