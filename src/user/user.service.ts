import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interface/user.entity';
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
        const saltOrRounds = 10;
        const password = createUserDto.password;
        const passwordHashed = await hash(password, saltOrRounds);
        console.log("senha criptografada",passwordHashed)

        //salva o usuario no banco de dados -
        return this.userRepository.save({
            ...createUserDto,
            password:passwordHashed,
        })
    }
}
