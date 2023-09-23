import { Param,Body, Controller,Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService:AddressService){}

    @Roles(UserType.User)//somente usuarios do tipo User podem entrar nessa rota -sao 3 tipos de usuarios definidos no arquivo enum-type.enum.ts
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddress:CreateAddressDto,
        @Param('userId') userId:number
        ):Promise<AddressEntity>{
            return(
                this.addressService.createAddress(createAddress,userId)
            )
    }
}
