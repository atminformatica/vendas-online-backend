import { Body,Controller,Get,Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interface/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllusers():Promise<UserEntity[]>{
        return this.userService.getAllUser()
    }

    @Post()
    async createUser(@Body() createUser:CreateUserDto):Promise<UserEntity>{
        return(
           this.userService.createUser(createUser)
        )
    }

}
