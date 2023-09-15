import { Body,Controller,Get,Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    @Get()
    async getAllusers(){
        return JSON.stringify("abc")
    }

    @Post()
    async createUser(@Body() createUser:CreateUserDto){
        return{
            ...createUser,  //spreet
            password:undefined //retorna o objeto createUser com o password vazio
        } 
    }

}
