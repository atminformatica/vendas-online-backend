import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interface/user.interface';
import {hash} from 'bcrypt'
import { promises } from 'dns';

@Injectable()
export class UserService {
    private users: User[] = []

    async getAllUser():Promise<User[]>{
        return (
            this.users
        )
    }
    async createUser(createUserDto:CreateUserDto): Promise<User>{
        const saltOrRounds = 10;
        const password = createUserDto.password;
        const passwordHashed = await hash(password, saltOrRounds);
        console.log("senha criptografada",passwordHashed)

        //salva o usuario no banco de dados - mas por enquanto vamos salvar em memoria apenas
        const user:User = {
            ...createUserDto,
            id:this.users.length + 1,
            password:passwordHashed,

        }

        this.users.push(user)    

        return user
    }
}
