import { Body,Param,Controller,Get,Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllusers():Promise<ReturnUserDto[]>{
        return (await this.userService.getAllUser()).map(
            (userEntity) => new ReturnUserDto(userEntity),
          );
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser:CreateUserDto):Promise<UserEntity>{
        return(
           this.userService.createUser(createUser)
        )
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
        return new ReturnUserDto(
            await this.userService.getUserByIdUsingRelations(userId)
        )
  }

}
