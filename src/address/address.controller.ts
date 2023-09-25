import { Param,Body, Controller,Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id-decorator';

@Roles(UserType.User)//somente usuarios do tipo User podem entrar nessa rota -sao 3 tipos de usuarios definidos no arquivo enum-type.enum.ts
@Controller('address')
export class AddressController {
    constructor(private readonly addressService:AddressService){}

   
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddress:CreateAddressDto,
        @UserId() userId:number
        ):Promise<AddressEntity>{
            console.log('conferido userid: ',userId)
            return(
                this.addressService.createAddress(createAddress,userId)
            )
    }
}
